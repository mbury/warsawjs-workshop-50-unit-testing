const { rentalStateHandler } = require('../rentals/rentals-handlers');
const RentalMapperMock = require('../rentals/rental-mapper');
const RentalBuilder = require('../rentals/rental-builder');

jest.mock('../rentals/rental-mapper');

// console.log(RentalMapperMock);
afterEach(() => {
  RentalMapperMock.findById.mockClear();
  RentalMapperMock.update.mockClear();
  res.send.mockClear();
});

beforeAll(() => {
  res.send = jest.fn();
});

const builder = new RentalBuilder();
const res = {};

describe('Rental state handler', () => {
  test('should pay deposit with success', async () => {
    const req = { params: { rental_id: 1, command: 'pay-deposit' } };
    const rental = { payDeposit: jest.fn() };
    RentalMapperMock.findById.mockReturnValueOnce(rental);
    res.send = jest.fn();

    await rentalStateHandler(req, res);

    expect(rental.payDeposit).toHaveBeenCalledTimes(1);

    expect(RentalMapperMock.findById).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.findById).toHaveBeenLastCalledWith(1);

    expect(RentalMapperMock.update).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.update).toHaveBeenLastCalledWith(rental);

    expect(RentalMapperMock.update).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.update).toHaveBeenLastCalledWith(rental);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenLastCalledWith(200);
  });

  test('should return payed deposit with success', async () => {
    const rental = builder.buildPaid();
    const req = {
      params: { rental_id: rental.rental_id, command: 'return-deposit' },
    };
    RentalMapperMock.findById.mockReturnValueOnce(rental);

    await rentalStateHandler(req, res);

    expect(RentalMapperMock.findById).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.findById).toHaveBeenLastCalledWith(1);

    expect(RentalMapperMock.update).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.update).toHaveBeenLastCalledWith(rental);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenLastCalledWith(200);
  });

  test('should return payed deposit with success v2', async () => {
    const rental = builder.buildPaid();
    const idUnderTest = rental.rental_id;
    const params = { rental_id: idUnderTest, command: 'return-deposit' };
    const req = { params };

    RentalMapperMock.findById.mockReturnValueOnce(rental);

    await rentalStateHandler(req, res);

    expect(RentalMapperMock.findById).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.findById).toHaveBeenLastCalledWith(idUnderTest);

    expect(RentalMapperMock.update).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.update).toHaveBeenLastCalledWith(rental);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenLastCalledWith(200);
  });

  test('should return payed deposit with success v3', async () => {
    const rental = builder.buildPaid();
    const idUnderTest = rental.rental_id;
    const params = { rental_id: idUnderTest, command: 'return-deposit' };
    const req = { params };
    const rentalSpy = jest.spyOn(rental, 'returnDeposit');
    RentalMapperMock.findById.mockReturnValueOnce(rental);

    await rentalStateHandler(req, res);

    expect(RentalMapperMock.findById).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.findById).toHaveBeenLastCalledWith(idUnderTest);

    expect(rentalSpy).toHaveBeenCalledTimes(1);

    expect(RentalMapperMock.update).toHaveBeenCalledTimes(1);
    expect(RentalMapperMock.update).toHaveBeenLastCalledWith(rental);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenLastCalledWith(200);
  });
});
