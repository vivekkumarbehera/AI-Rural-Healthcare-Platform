'use client';
// components/Navbar.js
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(5, 13, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4b8, #1e90ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: '0 0 15px rgba(0,212,184,0.4)',
          }}>❤️</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f0f6ff' }}>
            AI<span style={{ color: '#00d4b8' }}>Health</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          {session ? (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-ghost"
                style={{ padding: '8px 16px', fontSize: '0.875rem' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
                Sign In
              </Link>
              <Link href="/auth/smart-er" className="btn btn-er" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
                🚨 Smart ER
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} style={{
      color: 'rgba(240,246,255,0.7)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      padding: '6px 12px',
      borderRadius: 8,
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.target.style.color = '#00d4b8'; e.target.style.background = 'rgba(0,212,184,0.08)'; }}
    onMouseLeave={e => { e.target.style.color = 'rgba(240,246,255,0.7)'; e.target.style.background = 'transparent'; }}
    >
      {children}
    </Link>
  );
}
