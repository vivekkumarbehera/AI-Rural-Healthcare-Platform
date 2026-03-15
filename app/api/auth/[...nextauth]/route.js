// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Dynamic import to avoid edge runtime issues with better-sqlite3
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
  return db;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = getDb();
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(credentials.email);
        if (!user) return null;
        const valid = bcrypt.compareSync(credentials.password, user.password_hash);
        if (!valid) return null;
        return { id: String(user.id), name: user.name, email: user.email, role: 'user' };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.role = user.role; token.id = user.id; }
      return token;
    },
    async session({ session, token }) {
      if (token) { session.user.role = token.role; session.user.id = token.id; }
      return session;
    },
  },
  pages: { signIn: '/auth/signin' },
  secret: process.env.NEXTAUTH_SECRET || 'ai-rural-health-secret-key-2024',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
