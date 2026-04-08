const { getDb } = require('../config/database');

const Session = {
  create: (subject, createdBy, duration = 25) => {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO sessions (subject, created_by, duration, status)
      VALUES (?, ?, ?, 'waiting')
    `);
    const result = stmt.run(subject, createdBy, duration);
    return { id: result.lastInsertRowid, subject, created_by: createdBy, duration };
  },

  findActiveBySubject: (subject) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT s.*, COUNT(p.user_id) as participant_count
      FROM sessions s
      LEFT JOIN participants p ON s.id = p.session_id
      WHERE s.subject = ? AND s.status = 'waiting'
      GROUP BY s.id
    `);
    return stmt.all(subject);
  },

  findById: (id) => {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM sessions WHERE id = ?');
    return stmt.get(id);
  },

  updateStatus: (id, status) => {
    const db = getDb();
    const stmt = db.prepare('UPDATE sessions SET status = ? WHERE id = ?');
    return stmt.run(status, id);
  },

  startSession: (id) => {
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE sessions 
      SET status = 'active', start_time = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    return stmt.run(id);
  },

  extendSession: (id, additionalMinutes = 5) => {
    const db = getDb();
    const session = Session.findById(id);
    const newExtendCount = (session.extend_count || 0) + 1;
    
    if (newExtendCount > 3) {
      throw new Error('Maximum extensions reached (3)');
    }
    
    const stmt = db.prepare(`
      UPDATE sessions 
      SET duration = duration + ?, extend_count = ?
      WHERE id = ?
    `);
    return stmt.run(additionalMinutes, newExtendCount, id);
  },

  getParticipants: (sessionId) => {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT u.id, u.name, p.is_ready, p.is_active
      FROM participants p
      JOIN users u ON p.user_id = u.id
      WHERE p.session_id = ?
    `);
    return stmt.all(sessionId);
  }
};

module.exports = Session;
