const Rental = require('../rentals/rental');
const RentalBuilder = require('../rentals/rental-builder');

const builder = new RentalBuilder();

describe('Rental builder', () => {
  test('should return valid rental class', () => {
    const rental = builder
      .rentBy(1)
      .selectCar(1)
      .depositAmount(5000)
      .inState(Rental.RESERVED)
      .build();
    expect(rental).toMatchSnapshot();
  });

  test('should return class with valid payed state', () => {
    const rental = builder.buildPaid();
    expect(rental.getState()).toMatchInlineSnapshot(`"DEPOSIT_PAID"`);
  });
});
