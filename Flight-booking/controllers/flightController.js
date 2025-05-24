const pool = require('../config/db');

exports.searchFlights = async (req, res) => {
  const { origin, destination, departure_date, passengers } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM flights 
       WHERE origin=$1 AND destination=$2 AND departure_date=$3 AND available_seats >= $4`,
      [origin, destination, departure_date, passengers]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
