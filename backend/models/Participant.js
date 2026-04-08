const { getDb } = require('../config/database');

const Participant = {
  add: (sessionId, userId) => {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO participants (session_id, user_id)
      VALUES (?, ?)
    `);
    return stmt.run(sessionId, userId);
  },

  setReady: (sessionId, userId) => {
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE participants SET is_ready = 1 WHERE session_id = ? AND user_id = ?
    `);
    return stmt.run(sessionId, userId);
  },

  setActive: (sessionId, userId, isActive) => {
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE participants SET is_active = ? WHERE session_id = ? AND user_id = ?
    `);
    return stmt.run(isActive ? 1 : 0, sessionId, userId);
  },

  countReady: (sessionId) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT COUNT(*) as count FROM participants 
      WHERE session_id = ? AND is_ready = 1
    `);
    return stmt.get(sessionId).count;
  },

  countTotal: (sessionId) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT COUNT(*) as count FROM participants WHERE session_id = ?
    `);
    return stmt.get(sessionId).count;
  },

  isUserInSession: (sessionId, userId) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT * FROM participants WHERE session_id = ? AND user_id = ?
    `);
    return stmt.get(sessionId, userId);
  }
};

module.exports = Participant;
