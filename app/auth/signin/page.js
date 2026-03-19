'use client';
// app/auth/signin/page.js — Email Sign In + Create Account
import { Suspense, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SignInContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get('tab') === 'signup') setTab('signup');
  }, [params]);

  async function handleSignIn(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/dashboard');
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Registration failed.');
    } else {
      setSuccess('Account created! Signing you in...');
      setTimeout(async () => {
        const loginRes = await signIn('credentials', { email, password, redirect: false });
        if (!loginRes?.error) router.push('/dashboard');
      }, 1000);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 60px',
    }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(0,212,184,0.06), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="text-center" style={{ marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4b8, #1e90ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px',
            boxShadow: '0 0 30px rgba(0,212,184,0.3)',
          }}>❤️</div>
          <h2 style={{ marginBottom: 8 }}>
            {tab === 'signin' ? 'Welcome Back' : 'Join AIHealth'}
          </h2>
          <p style={{ color: '#8ba3c0', fontSize: '0.9rem' }}>
            {tab === 'signin' ? 'Sign in to your health dashboard' : 'Create your free account today'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: 4, marginBottom: 28,
        }}>
          {[['signin', 'Sign In'], ['signup', 'Create Account']].map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: '0.9rem', transition: 'all 0.2s',
                background: tab === id ? 'linear-gradient(135deg, #00d4b8, #1e90ff)' : 'transparent',
                color: tab === id ? '#fff' : '#8ba3c0',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: 32 }}>
          {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}
          {success && <div className="alert alert-success" style={{ marginBottom: 20 }}>{success}</div>}

          <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {tab === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <input className="input" type="text" placeholder="Your full name" value={name}
                  onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input className="input" type="email" placeholder="you@example.com" required
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password {tab === 'signup' && <span style={{ color: '#4a6481' }}>(min. 6 characters)</span>}</label>
              <input className="input" type="password" placeholder="••••••••" required
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px 0', fontSize: '1rem', marginTop: 4 }} disabled={loading}>
              {loading ? '⏳ Please wait...' : tab === 'signin' ? '→ Sign In' : '✨ Create Account'}
            </button>
          </form>

          <div className="divider" style={{ margin: '24px 0' }}>or</div>

          <div className="text-center">
            <p style={{ color: '#8ba3c0', fontSize: '0.875rem' }}>
              {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setTab(tab === 'signin' ? 'signup' : 'signin')}
                style={{ color: '#00d4b8', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                {tab === 'signin' ? 'Create one →' : 'Sign in →'}
              </button>
            </p>
          </div>
        </div>

        {/* Smart ER link */}
        <div className="text-center" style={{ marginTop: 24 }}>
          <p style={{ color: '#4a6481', fontSize: '0.85rem', marginBottom: 10 }}>Hospital staff?</p>
          <Link href="/auth/smart-er" className="btn btn-er" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            🚨 Go to Smart ER Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f18' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(0,212,184,0.1)', borderTopColor: '#00d4b8', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

