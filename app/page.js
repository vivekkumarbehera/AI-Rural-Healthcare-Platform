// app/page.js — Landing / Home Page
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,184,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,144,255,0.08), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(0,212,184,0.1)', border: '1px solid rgba(0,212,184,0.25)', marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4b8', boxShadow: '0 0 8px #00d4b8', animation: 'er-pulse 2s infinite' }} />
            <span style={{ color: '#00d4b8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>AI-POWERED HEALTH SYSTEM</span>
          </div>

          {/* Heading */}
          <h1 style={{ marginBottom: 24, lineHeight: 1.1 }}>
            Your Smart<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Health Assistant
            </span><br />
            <span style={{ fontSize: '60%', fontWeight: 400, color: '#8ba3c0' }}>for Rural Areas</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#8ba3c0', maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Get AI-powered symptom checks, connect to nearby hospitals, and access emergency services — all from your phone, even in remote areas.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <Link href="/auth/signin?tab=signup" className="btn btn-primary" style={{ minWidth: 160, fontSize: '1.05rem', padding: '16px 32px' }}>
              ✨ Create Account
            </Link>
            <Link href="/auth/signin" className="btn btn-outline" style={{ minWidth: 160, fontSize: '1.05rem', padding: '16px 32px' }}>
              Sign In
            </Link>
          </div>
          <div>
            <Link href="/auth/smart-er" className="btn btn-er" style={{ minWidth: 200, fontSize: '1rem', padding: '14px 32px' }}>
              🚨 Smart ER Login — Hospital Staff
            </Link>
          </div>

          {/* Scroll hint */}
          <p style={{ color: '#4a6481', fontSize: '0.8rem', marginTop: 56 }}>↓ Learn more about the system</p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <span className="badge badge-teal" style={{ marginBottom: 16 }}>Features</span>
            <h2>Everything You Need,<br /><span style={{ color: '#00d4b8' }}>Right in Your Pocket</span></h2>
          </div>

          <div className="grid-3">
            {[
              { icon: '🤖', title: 'AI Symptom Checker', desc: 'Describe your symptoms and get instant AI-powered analysis and guidance on what to do next.', badge: 'Coming Soon', color: '#00d4b8' },
              { icon: '🏥', title: 'Nearby Hospitals', desc: 'Find the closest clinics and hospitals in your area with directions and contact information.', badge: 'GPS-Powered', color: '#1e90ff' },
              { icon: '🚨', title: 'Smart ER System', desc: 'Emergency alert system that connects patients directly with hospital staff in critical moments.', badge: 'Live', color: '#ff4757' },
              { icon: '📄', title: 'Health Reports', desc: 'Download and share PDF health reports with your AI consultation history.', badge: 'PDF Export', color: '#00d4b8' },
              { icon: '💊', title: 'Health Assistant', desc: 'Chat with an AI assistant trained on medical knowledge for rural health guidance.', badge: 'Claude AI', color: '#a855f7' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is encrypted and never shared without your consent.', badge: 'Protected', color: '#10b981' },
            ].map((f) => (
              <div key={f.title} className="card" style={{ background: 'linear-gradient(135deg, rgba(0,212,184,0.04), rgba(30,144,255,0.03))' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <span style={{
                  display: 'inline-block', marginBottom: 10, padding: '3px 10px',
                  borderRadius: 100, fontSize: '0.7rem', fontWeight: 600,
                  background: `rgba(255,255,255,0.06)`, color: f.color,
                  border: `1px solid ${f.color}40`,
                }}>{f.badge}</span>
                <h3 style={{ marginBottom: 8, color: '#f0f6ff' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IS IT FOR ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <h2>Built For <span style={{ color: '#00d4b8' }}>Two Types</span> of Users</h2>
          </div>
          <div className="grid-2">
            {/* Patient */}
            <div className="card" style={{ borderColor: 'rgba(0,212,184,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(0,212,184,0.1), transparent)', borderRadius: '0 0 0 120px' }} />
              <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍⚕️</div>
              <h3 style={{ color: '#00d4b8', marginBottom: 12 }}>Patients & Community</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Check symptoms with AI', 'Find nearby hospitals', 'Get emergency help instantly', 'Download health reports', 'Chat with AI health assistant'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#8ba3c0', fontSize: '0.9rem' }}>
                    <span style={{ color: '#00d4b8' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 28 }}>
                <Link href="/auth/signin?tab=signup" className="btn btn-primary" style={{ width: '100%' }}>
                  Create Account →
                </Link>
              </div>
            </div>

            {/* Staff */}
            <div className="card" style={{ borderColor: 'rgba(255,71,87,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(255,71,87,0.1), transparent)', borderRadius: '0 0 0 120px' }} />
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏥</div>
              <h3 style={{ color: '#ff4757', marginBottom: 12 }}>Hospital Staff</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['View incoming patient cases', 'Access emergency alerts instantly', 'Manage patient summaries', 'Coordinate hospital response', 'Monitor rural health data'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#8ba3c0', fontSize: '0.9rem' }}>
                    <span style={{ color: '#ff4757' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 28 }}>
                <Link href="/auth/smart-er" className="btn btn-er" style={{ width: '100%' }}>
                  🚨 Smart ER Login →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER BANNER ─── */}
      <section style={{ padding: '32px 24px' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'rgba(255,215,0,0.06)',
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: 16, padding: '20px 28px',
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}>
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div>
            <p style={{ color: '#ffd700', fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>Medical Disclaimer</p>
            <p style={{ color: '#8ba3c0', fontSize: '0.85rem' }}>
              This app provides AI-based guidance only and is <strong style={{ color: '#f0f6ff' }}>not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified doctor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
