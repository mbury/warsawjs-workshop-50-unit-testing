import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
  waitFor,
} from '@testing-library/react';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import CarsTable from '../components/cars-table';
import { Redirect as RedirectMock } from 'react-router-dom';

const buildFakeCar = build('Car', {
  fields: {
    car_id: sequence(),
    make: fake(f => f.commerce.productName()),
    model: fake(f => f.company.companyName()),
    price: fake(f => f.commerce.price()),
  },
});

const cars = [buildFakeCar(), buildFakeCar()];

const server = setupServer(
  rest.get('/api/cars', async (req, res, ctx) => {
    return res(ctx.json(cars));
  }),
  rest.get('/api/cars/:id/rent', async (req, res, ctx) => {
    return res(ctx.status(201));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  RedirectMock.mockClear();
});

jest.mock('react-router', () => ({
  Redirect: jest.fn(),
}));

test('renders cars table', async () => {
  render(<CarsTable />);

  await waitForElementToBeRemoved(() => screen.getByText(/trwa ładowanie/i));

  const rows = screen.getAllByTestId(/^car-*/i);

  expect(rows.length).toBe(cars.length);
});

test('rent car and redirect to rentals screen', async () => {
  const carIndex = 1;
  RedirectMock.mockReturnValue(<div>rentals</div>);

  render(<CarsTable />);
  await waitForElementToBeRemoved(() => screen.getByText(/trwa ładowanie/i));

  const rows = screen.getAllByTestId(/^car-*/i);
  const utils = within(rows[carIndex]);
  const rentButton = utils.getByText(/wynajmij/i);

  fireEvent.click(rentButton);
  await waitFor(() => screen.getByText('rentals'));
  expect(RedirectMock).toHaveBeenCalledTimes(1);
  expect(RedirectMock).toHaveBeenCalledWith({ to: '/rentals' }, {});
});
