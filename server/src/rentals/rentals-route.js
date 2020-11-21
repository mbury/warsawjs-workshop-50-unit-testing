var express = require('express');
var router = express.Router();

const {
  rentalsFindHandler,
  rentalStateHandler,
} = require('./rentals-handlers');

router.get('/', rentalsFindHandler);
router.get('/:rental_id/:command', rentalStateHandler);

module.exports = router;
