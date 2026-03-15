// lib/auth.js — NextAuth configuration
const bcrypt = require('bcryptjs');
const { getDb } = require('./db');

const authOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
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

        return { id: user.id, name: user.name, email: user.email, role: 'user' };
      },
    },
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'ai-rural-health-secret-key-2024',
};

module.exports = { authOptions };
