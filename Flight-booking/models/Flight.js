class Flight {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const query = 'SELECT * FROM flights';
    const { rows } = await this.pool.query(query);
    return rows;
  }

  async search({ origin, destination, departureDate, passengers }) {
    console.log(origin);
    const startDate = new Date(departureDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(departureDate);
    endDate.setHours(23, 59, 59, 999);

    const query = `
      SELECT * FROM flights
      WHERE origin ILIKE $1
      AND destination ILIKE $2
      AND departure_time BETWEEN $3 AND $4
      AND available_seats >= $5
    `;
    const { rows } = await this.pool.query(query, [
      `%${origin}%`,
      `%${destination}%`,
      startDate,
      endDate,
      passengers || 1
    ]);
    return rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM flights WHERE id = $1';
    const { rows } = await this.pool.query(query, [id]);
    return rows[0];
  }

  async updateAvailableSeats(id, seatsChange) {
    const query = `
      UPDATE flights
      SET available_seats = available_seats - $1
      WHERE id = $2
      RETURNING *
    `;
    const { rows } = await this.pool.query(query, [seatsChange, id]);
    return rows[0];
  }
}

module.exports = Flight;