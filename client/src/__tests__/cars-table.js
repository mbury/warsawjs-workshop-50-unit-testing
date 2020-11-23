import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
  waitFor,
} from '@testing-library/react';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';

import CarsTable from '../components/cars-table';
import { getCars as getCarsMock, rentCar as rentCarMock } from '../api';
import { Redirect as RedirectMock } from 'react-router-dom';

const buildFakeCar = build('Car', {
  fields: {
    car_id: sequence(),
    make: fake(f => f.commerce.productName()),
    model: fake(f => f.company.companyName()),
    price: fake(f => f.commerce.price()),
  },
});

jest.mock('../api', () => {
  return {
    getCars: jest.fn(),
    rentCar: jest.fn(),
  };
});

jest.mock('react-router', () => ({
  Redirect: jest.fn(),
}));

afterEach(() => {
  getCarsMock.mockClear();
  rentCarMock.mockClear();
  RedirectMock.mockClear();
});

test('renders cars table', async () => {
  const cars = [buildFakeCar(), buildFakeCar()];
  getCarsMock.mockResolvedValue(cars);

  render(<CarsTable />);

  expect(getCarsMock).toHaveBeenCalledTimes(1);

  await waitForElementToBeRemoved(() => screen.getByText(/trwa ładowanie/i));

  const rows = screen.getAllByTestId(/^car-*/i);

  expect(rows.length).toBe(cars.length);
});

test('rent car and redirect to rentals screen', async () => {
  const cars = [buildFakeCar(), buildFakeCar()];
  const carIndex = 1;
  getCarsMock.mockResolvedValue(cars);
  RedirectMock.mockReturnValue(<div>rentals</div>);

  render(<CarsTable />);

  await waitForElementToBeRemoved(() => screen.getByText(/trwa ładowanie/i));

  const rows = screen.getAllByTestId(/^car-*/i);
  const utils = within(rows[carIndex]);
  const rentButton = utils.getByText(/wynajmij/i);
  fireEvent.click(rentButton);
  await waitFor(() => screen.getByText('rentals'));
  expect(rentCarMock).toHaveBeenCalledTimes(1);
  expect(rentCarMock).toHaveBeenCalledWith(cars[carIndex].car_id);
  expect(RedirectMock).toHaveBeenCalledTimes(1);
  expect(RedirectMock).toHaveBeenCalledWith({ to: '/rentals' }, {});
});
