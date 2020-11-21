const RentalMapper = require('./rental-mapper');
const knex = require('knex')(require('../../knexfile'));

async function rentalsFindHandler(req, res) {
  const client_id = req.session.user.user_id;
  const rentals = await knex('rentals')
    .select('*')
    .where('client_id', client_id);

  return res.json(rentals);
}

async function rentalStateHandler(req, res) {
  const { rental_id, command } = req.params;

  const itsRental = await RentalMapper.findById(rental_id);
  switch (command) {
    case 'pay-deposit':
      itsRental.payDeposit();
      break;
    case 'return-deposit':
      itsRental.returnDeposit();
      break;
    case 'take-car':
      itsRental.takeCar();
      break;
    case 'return-car':
      itsRental.returnCar();
      break;
    default:
      break;
  }
  await RentalMapper.update(itsRental);

  return res.send(200);
}
exports.rentalStateHandler = rentalStateHandler;
exports.rentalsFindHandler = rentalsFindHandler;
