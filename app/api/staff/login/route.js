// app/api/staff/login/route.js — Smart ER Staff Login
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

function getDb() {
  const Database = require('better-sqlite3');
  const path = require('path');
  const db = new Database(path.join(process.cwd(), 'health.db'));
  db.pragma('journal_mode = WAL');
  db.exec(`
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

  // Seed demo staff
  const ex = db.prepare('SELECT id FROM staff WHERE email = ?').get('staff@demo.com');
  if (!ex) {
    const hash = bcrypt.hashSync('SmartER123!', 10);
    db.prepare('INSERT INTO staff (name, email, password_hash, hospital, role, staff_code) VALUES (?, ?, ?, ?, ?, ?)')
      .run('Dr. Priya Sharma', 'staff@demo.com', hash, 'Rural Health Center', 'Doctor', 'ER-2024');
  }
  return db;
}

export async function POST(request) {
  try {
    const { email, password, staffCode } = await request.json();

    if (!email || !password || !staffCode) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const db = getDb();
    const staff = db.prepare('SELECT * FROM staff WHERE email = ?').get(email);
    if (!staff) {
      return NextResponse.json({ error: 'Staff account not found.' }, { status: 401 });
    }
    if (staff.staff_code !== staffCode) {
      return NextResponse.json({ error: 'Invalid staff code.' }, { status: 401 });
    }
    const valid = bcrypt.compareSync(password, staff.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      staff: { id: staff.id, name: staff.name, email: staff.email, hospital: staff.hospital, role: staff.role },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
