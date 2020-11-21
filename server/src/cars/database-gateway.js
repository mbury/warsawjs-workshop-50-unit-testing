const knex = require('knex')(require('../../knexfile'));

async function findCar(carId) {
  const car = await knex('cars')
    .first()
    .where('car_id', carId);
  return car;
}

async function findClient(clientId) {
  const client = await knex('users')
    .first()
    .where('user_id', clientId);
  return client;
}

async function rentalCountFor(clientId) {
  const { clientRentalCount } = await knex('rentals')
    .first()
    .count('client_id as clientRentalCount')
    .where('client_id', clientId);
  return clientRentalCount;
}

async function insertRental(car_id, client_id, deposit) {
  await knex('rentals').insert({
    car_id,
    client_id,
    deposit,
    state: 'RESERVED',
  });
}

const db = {
  findCar,
  findClient,
  rentalCountFor,
  insertRental,
};

module.exports = db;
