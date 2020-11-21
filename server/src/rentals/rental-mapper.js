const knex = require('knex')(require('../../knexfile'));
const Rental = require('./rental');

class RentalMapper {
  static async findById(rental_id) {
    const dto = await knex('rentals').first().where('rental_id', rental_id);

    const { car_id, client_id, deposit, state } = dto;
    return new Rental(rental_id, car_id, client_id, deposit, state);
  }

  static async update(rental) {
    let { car_id, client_id, deposit, state } = rental;
    const dto = {
      car_id,
      client_id,
      deposit,
      state: state,
    };
    return knex('rentals').where('rental_id', rental.rental_id).update(dto);
  }
}

module.exports = RentalMapper;
