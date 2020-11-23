const Rental = require('../rentals/rental');
const RentalBuilder = require('../rentals/rental-builder');

describe('Rental class', () => {
  test('should change state to deposit paid', () => {
    const itsRental = new Rental(1, 1, 1, 6000);

    itsRental.payDeposit();

    expect(itsRental.getState()).toBe(Rental.DEPOSIT_PAID);
  });

  test('should change state to deposit settled', () => {
    const itsRental = new Rental(1, 1, 1, 6000, Rental.DEPOSIT_PAID);

    itsRental.returnDeposit();

    expect(itsRental.getState()).toBe(Rental.DEPOSIT_SETTLED);
  });

  test('should change state to deposit paid v2', () => {
    const builder = new RentalBuilder();
    const rental = builder.selectCar(1).rentBy(1).depositAmount(6000).build();

    rental.payDeposit();

    expect(rental.getState()).toBe(Rental.DEPOSIT_PAID);
  });

  test('should change state to deposit settled v2', () => {
    const builder = new RentalBuilder();
    const rental = builder.buildPaid();
    rental.returnDeposit();

    expect(rental.getState()).toBe(Rental.DEPOSIT_SETTLED);
  });
});
