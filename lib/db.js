// lib/db.js — SQLite database setup
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(process.cwd(), 'health.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeDb(db);
  }
  return db;
}

function initializeDb(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      hospital TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'nurse',
      staff_code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed a demo staff account
  const existing = db.prepare('SELECT id FROM staff WHERE email = ?').get('staff@demo.com');
  if (!existing) {
    const hash = bcrypt.hashSync('SmartER123!', 10);
    db.prepare(`
      INSERT INTO staff (name, email, password_hash, hospital, role, staff_code)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('Dr. Priya Sharma', 'staff@demo.com', hash, 'Rural Health Center', 'doctor', 'ER-2024');
  }
}

module.exports = { getDb };
