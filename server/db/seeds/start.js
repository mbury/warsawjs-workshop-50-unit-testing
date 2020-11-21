module.exports.seed = async function (knex) {
  await knex('cars').del();
  await knex('cars').insert([
    {
      car_id: 1,
      make: 'LAMBORGHINI',
      model: 'AVENTADOR LP700-4',
      price: 2235100,
    },
    {
      car_id: 2,
      make: 'FERRARI',
      model: '458 ITALIA',
      price: 1198560,
    },
    {
      car_id: 3,
      make: 'NISSAN',
      model: 'GT-R',
      price: 915000,
    },
    {
      car_id: 4,
      make: 'FORD',
      model: 'MUSTANG',
      price: 235810,
    },
    {
      car_id: 5,
      make: 'LADA',
      model: 'SAMARA',
      price: 28000,
    },
    {
      car_id: 6,
      make: 'PORSCHE',
      model: 'PANAMERA',
      price: 989000,
    },
  ]);
  await knex('users').del();
  await knex('users').insert([
    {
      user_id: 1,
      name: 'Jan Kowalski',
      email: 'jankowalski@warsaw.js',
      password: 'pass',
      isVip: 0,
    },
    {
      user_id: 2,
      name: 'Robert Kubica',
      email: 'robertkubica@warsaw.js',
      password: 'pass',
      isVip: 1,
    },
  ]);

  await knex('rentals').del();
};
