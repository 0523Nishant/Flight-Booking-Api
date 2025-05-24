const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  constructor(pool) {
    this.pool = pool;
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await this.pool.query(query, [email]);
    return rows[0];
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await this.pool.query(query, [id]);
    return rows[0];
  }

  async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await this.pool.query(query, [username, email, hashedPassword]);
    return rows[0];
  }

  generateAuthToken(user) {
    return jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}

module.exports = User;
