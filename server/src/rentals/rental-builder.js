const Rental = require('./rental');

class RentalBuilder {
  constructor() {
    this.rental_id = 1;
  }
  rentBy(client_id) {
    this.client_id = client_id;
    return this;
  }
  selectCar(car_id) {
    this.car_id = car_id;
    return this;
  }

  depositAmount(deposit) {
    this.deposit = deposit;
    return this;
  }
  inState(state) {
    this.state = state;
    return this;
  }

  buildPaid() {
    return this.selectCar(1)
      .rentBy(1)
      .depositAmount(6000)
      .inState('DEPOSIT_PAID')
      .build();
  }

  build() {
    const { rental_id, car_id, client_id, deposit, state } = this;
    return new Rental(rental_id, car_id, client_id, deposit, state);
  }
}

module.exports = RentalBuilder;
