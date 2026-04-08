const { getDb } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  create: (name, email, password) => {
    const db = getDb();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(name, email, hashedPassword);
    return { id: result.lastInsertRowid, name, email };
  },

  findByEmail: (email) => {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  findById: (id) => {
    const db = getDb();
    const stmt = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  },

  verifyPassword: (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  }
};

module.exports = User;
