const generateRef = require('../utils/generateRef');

class Booking {
  constructor(pool) {
    this.pool = pool;
  }

  async create({ userId, flightId, passengers }) {
    const bookingRef = generateRef();
    const query = `
      INSERT INTO bookings (user_id, flight_id, passengers, booking_reference)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await this.pool.query(query, [userId, flightId, passengers, bookingRef]);
    return rows[0];
  }

  async findByUser(userId) {
    const query = `
      SELECT b.*, 
             f.flight_number, f.airline, f.origin, f.destination,
             f.departure_time, f.arrival_time, f.price
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      WHERE b.user_id = $1
    `;
    const { rows } = await this.pool.query(query, [userId]);
    return rows;
  }
}

module.exports = Booking;