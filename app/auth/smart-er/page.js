'use client';
// app/auth/smart-er/page.js — Hospital Staff Emergency Login
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SmartERLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, staffCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
      } else {
        // Store staff session in sessionStorage
        sessionStorage.setItem('staffSession', JSON.stringify(data.staff));
        router.push('/dashboard/staff');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 60px',
    }}>
      {/* Red glow background */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(255,71,87,0.07), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div className="text-center" style={{ marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 100,
            background: 'rgba(255,71,87,0.12)', border: '1px solid rgba(255,71,87,0.35)',
            marginBottom: 20,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4757', animation: 'er-pulse 1.5s infinite' }} />
            <span style={{ color: '#ff4757', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>SMART ER — RESTRICTED ACCESS</span>
          </div>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff4757, #c0392b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 16px',
            boxShadow: '0 0 40px rgba(255,71,87,0.4)',
          }}>🚨</div>
          <h2 style={{ marginBottom: 8, color: '#ff4757' }}>Smart ER Portal</h2>
          <p style={{ color: '#8ba3c0', fontSize: '0.9rem' }}>For verified hospital staff only.<br />Unauthorized access is prohibited.</p>
        </div>

        {/* Form */}
        <div className="card" style={{ borderColor: 'rgba(255,71,87,0.2)', background: 'rgba(255,71,87,0.03)' }}>
          {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label>Staff Email</label>
              <input className="input" type="email" placeholder="doctor@hospital.com" required
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="input" type="password" placeholder="••••••••" required
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Staff / Hospital Code</label>
              <input className="input" type="text" placeholder="e.g. ER-2024" required
                value={staffCode} onChange={e => setStaffCode(e.target.value)} />
              <small style={{ color: '#4a6481', fontSize: '0.78rem' }}>Issued by your hospital administrator</small>
            </div>

            <button type="submit" className="btn btn-er" style={{ width: '100%', padding: '14px 0', fontSize: '1rem', marginTop: 4 }} disabled={loading}>
              {loading ? '⏳ Verifying...' : '🔓 Access Smart ER Dashboard'}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 10, background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)' }}>
            <p style={{ fontSize: '0.8rem', color: '#8ba3c0', lineHeight: 1.6 }}>
              <strong style={{ color: '#ffd700' }}>🧪 Demo credentials:</strong><br />
              Email: <code style={{ color: '#00d4b8' }}>staff@demo.com</code><br />
              Password: <code style={{ color: '#00d4b8' }}>SmartER123!</code><br />
              Staff Code: <code style={{ color: '#00d4b8' }}>ER-2024</code>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center" style={{ marginTop: 24 }}>
          <Link href="/" style={{ color: '#4a6481', fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
          <span style={{ color: '#4a6481', margin: '0 12px' }}>·</span>
          <Link href="/auth/signin" style={{ color: '#00d4b8', fontSize: '0.875rem', textDecoration: 'none' }}>
            Patient Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
