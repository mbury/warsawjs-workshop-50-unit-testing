var express = require('express');
const knex = require('knex')(require('../../knexfile'));
const { rentCarHandler } = require('./cars-handlers');
var router = express.Router();

router.get('/', async function (req, res) {
  const cars = await knex('cars').select('*');
  res.json(cars);
});

router.get('/:car_id/rent', rentCarHandler);

module.exports = router;
