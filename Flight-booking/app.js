const express = require('express');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User'); 
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const pool = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('views'));


const userModel = new User(pool);
app.locals.userModel = userModel; 


app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
