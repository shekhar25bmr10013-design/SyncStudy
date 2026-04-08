const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../database/syncstudy.db');
const db = new Database(dbPath);

const initDatabase = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      created_by INTEGER NOT NULL,
      status TEXT DEFAULT 'waiting',
      start_time DATETIME,
      duration INTEGER DEFAULT 25,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      extend_count INTEGER DEFAULT 0,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Participants table
  db.exec(`
    CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      is_ready BOOLEAN DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(session_id, user_id)
    )
  `);

  // Messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      sender_name TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions(id),
      FOREIGN KEY (sender_id) REFERENCES users(id)
    )
  `);

  console.log('✅ SQLite database initialized');
};

const getDb = () => db;

module.exports = { initDatabase, getDb };
