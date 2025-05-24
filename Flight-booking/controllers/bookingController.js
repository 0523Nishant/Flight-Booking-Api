const pool = require('../config/db');

exports.bookFlight = async (req, res) => {
  const { flight_id, passengers } = req.body;
  const user_id = req.user.id;

  try {
    await pool.query('BEGIN');

    const flight = await pool.query('SELECT * FROM flights WHERE id = $1', [flight_id]);

    if (flight.rows.length === 0 || flight.rows[0].available_seats < passengers) {
      throw new Error('Insufficient seats or flight not found');
    }

    await pool.query('INSERT INTO bookings(user_id, flight_id, passengers) VALUES ($1, $2, $3)', [user_id, flight_id, passengers]);

    await pool.query('UPDATE flights SET available_seats = available_seats - $1 WHERE id = $2', [passengers, flight_id]);

    await pool.query('COMMIT');
    res.send('Booking successful');
  } catch (err) {
    await pool.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  }
};
