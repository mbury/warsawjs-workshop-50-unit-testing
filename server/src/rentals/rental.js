class Rental {
  constructor(rental_id, car_id, client_id, deposit, state = Rental.RESERVED) {
    this.rental_id = rental_id;
    this.car_id = car_id;
    this.client_id = client_id;
    this.deposit = deposit;
    this.state = state;
  }
  payDeposit() {
    if (this.state !== 'RESERVED') {
      return;
    }
    this.state = 'DEPOSIT_PAID';
  }

  returnDeposit() {
    if (this.state !== 'DEPOSIT_PAID' && this.state !== 'CAR_RETURNED') {
      return;
    }
    this.state = 'DEPOSIT_SETTLED';
  }
  takeCar() {
    if (this.state !== 'DEPOSIT_PAID') {
      return;
    }
    this.state = 'CAR_IN_USE';
  }
  returnCar() {
    if (this.state !== 'CAR_IN_USE') {
      return;
    }
    this.state = 'CAR_RETURNED';
  }
  getState() {
    return this.state;
  }

  static get RESERVED() {
    return 'RESERVED';
  }
  static get DEPOSIT_PAID() {
    return 'DEPOSIT_PAID';
  }
  static get DEPOSIT_SETTLED() {
    return 'DEPOSIT_SETTLED';
  }
  static get CAR_IN_USE() {
    return 'CAR_IN_USE';
  }
  static get CAR_RETURNED() {
    return 'CAR_RETURNED';
  }
}

module.exports = Rental;
