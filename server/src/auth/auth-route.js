var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const knex = require('knex')(require('../../knexfile'));

router.post('/login', async function (req, res, next) {
  const user = await knex('users').first().where('email', req.body.email);
  if (!user) {
    next(createError(401));
  }
  req.session.user = user;
  res.json(user);
});

router.get('/current', async function (req, res, next) {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  next(createError(401));
});

router.get('/logout', async function (req, res) {
  res.clearCookie('connect.sid');
  return res.json({});
});

module.exports = router;
