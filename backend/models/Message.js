const { getDb } = require('../config/database');

const Message = {
  create: (sessionId, senderId, senderName, text) => {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO messages (session_id, sender_id, sender_name, text)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(sessionId, senderId, senderName, text);
  },

  getBySession: (sessionId, limit = 50) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.session_id = ?
      ORDER BY m.timestamp ASC
      LIMIT ?
    `);
    return stmt.all(sessionId, limit);
  }
};

module.exports = Message;
