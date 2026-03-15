'use client';
// app/dashboard/page.js — User Dashboard
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') return <LoadingScreen />;
  if (!session) return null;

  const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(30,144,255,0.05))', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ color: '#8ba3c0', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Welcome back</p>
                  <h2 style={{ color: '#f0f6ff', fontSize: '1.4rem' }}>{userName}</h2>
                </div>
              </div>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container section" style={{ maxWidth: 1200 }}>
        {/* Quick action banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,71,87,0.1), rgba(192,57,43,0.08))',
          border: '1px solid rgba(255,71,87,0.25)', borderRadius: 16,
          padding: '20px 28px', marginBottom: 40,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🚨</span>
            <div>
              <p style={{ color: '#ff4757', fontWeight: 700, fontSize: '0.9rem' }}>EMERGENCY?</p>
              <p style={{ color: '#8ba3c0', fontSize: '0.85rem' }}>Alert hospital staff immediately through Smart ER</p>
            </div>
          </div>
          <Link href="/auth/smart-er" className="btn btn-er" style={{ padding: '10px 24px', whiteSpace: 'nowrap' }}>
            🚨 Smart ER — Emergency Help
          </Link>
        </div>

        {/* Main dashboard cards */}
        <h3 style={{ marginBottom: 24, color: '#8ba3c0', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Health Tools</h3>
        <div className="grid-2" style={{ marginBottom: 48 }}>
          {[
            {
              icon: '🤖', title: 'AI Symptom Checker', desc: 'Describe how you feel and get instant AI-powered health guidance.', badge: 'Gemini AI', badgeColor: '#a855f7', action: 'Chat Now', link: '/dashboard/chat'
            },
            {
              icon: '💬', title: 'AI Health Assistant', desc: 'Chat with an intelligent health assistant powered by Gemini AI.', badge: 'Free Tier', badgeColor: '#1e90ff', action: 'Chat Now', link: '/dashboard/chat'
            },
            {
              icon: '🏥', title: 'Nearby Hospitals & Clinics', desc: 'Find healthcare facilities close to your location with directions and contact info.', badge: 'OpenStreetMap', badgeColor: '#10b981', action: 'View Map', link: '/dashboard/hospitals'
            },
            {
              icon: '📄', title: 'Health Reports', desc: 'View and download PDF exports of your AI consultation history.', badge: 'Coming Soon', badgeColor: '#00d4b8', action: null, link: null
            },
          ].map(card => (
            <div key={card.title} className="card" style={{ cursor: card.action ? 'pointer' : 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{card.icon}</span>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px', borderRadius: 100,
                  background: `${card.badgeColor}20`, color: card.badgeColor, border: `1px solid ${card.badgeColor}40`,
                }}>{card.badge}</span>
              </div>
              <h3 style={{ color: '#f0f6ff', marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 20 }}>{card.desc}</p>
              {card.action ? (
                <Link href={card.link} className="btn btn-outline" style={{ width: '100%', padding: '10px 0', fontSize: '0.875rem' }}>
                  {card.action} →
                </Link>
              ) : (
                <button style={{
                  width: '100%', padding: '10px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)', color: '#8ba3c0', cursor: 'not-allowed',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                }} disabled>
                  🔜 Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Health Tips */}
        <h3 style={{ marginBottom: 24, color: '#8ba3c0', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Daily Health Tips</h3>
        <div className="grid-3">
          {[
            { icon: '💧', tip: 'Drink at least 8 glasses of water daily to stay hydrated.' },
            { icon: '🥦', tip: 'Eat plenty of vegetables and fruits for essential vitamins and minerals.' },
            { icon: '🏃', tip: 'Get at least 30 minutes of physical activity every day.' },
            { icon: '😴', tip: 'Aim for 7–8 hours of quality sleep for good health.' },
            { icon: '🧼', tip: 'Wash hands frequently to prevent the spread of infections.' },
            { icon: '🩺', tip: 'Have regular check-ups even when you feel healthy.' },
          ].map(item => (
            <div key={item.icon} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{item.tip}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 40, padding: '16px 20px', background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: 12 }}>
          <p style={{ fontSize: '0.8rem', color: '#4a6481', textAlign: 'center' }}>
            ⚠️ AI Health tools provide guidance only — not medical diagnosis. Always consult a licensed healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,212,184,0.2)', borderTop: '3px solid #00d4b8', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#8ba3c0' }}>Loading your dashboard...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
