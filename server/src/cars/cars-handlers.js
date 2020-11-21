const db = require('./database-gateway');

async function rentCarHandler(req, res) {
  const { car_id: carId } = req.params;
  const clientId = req.session.user.user_id;

  const car = await db.findCar(carId);
  const client = await db.findClient(clientId);
  const rentalCount = await db.rentalCountFor(clientId);

  let deposit = 0;
  if (rentalCount < 1 && !client.isVip) {
    deposit = Math.max(10000, car.price * 0.2);
  } else if (rentalCount >= 1 && !client.isVip) {
    deposit = Math.min(Math.max(10000, car.price * 0.15), 60000);
  } else if (client.isVip) {
    deposit = Math.min(Math.max(5000, car.price * 0.1), 40000);
  }

  await db.insertRental(carId, clientId, deposit);

  return res.send(201);
}

module.exports = {
  rentCarHandler: rentCarHandler,
};
