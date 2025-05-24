const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { bookFlight } = require('../controllers/bookingController');

router.post('/book', auth, bookFlight);

module.exports = router;
