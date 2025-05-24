const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { searchFlights } = require('../controllers/flightController');

router.get('/search', auth, searchFlights);

module.exports = router;
