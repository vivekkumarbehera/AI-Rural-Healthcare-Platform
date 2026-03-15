// app/api/register/route.js — Create new user account
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

function getDb() {
  const Database = require('better-sqlite3');
  const path = require('path');
  const db = new Database(path.join(process.cwd(), 'health.db'));
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return NextResponse.json({ error: 'Email already registered. Please sign in.' }, { status: 409 });
    }

    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(name || '', email, hash);

    return NextResponse.json({ success: true, message: 'Account created successfully.' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
