'use client';
// app/dashboard/staff/page.js — Hospital Staff Dashboard (Smart ER)
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MOCK_CASES = [
  { id: 'ER-001', patient: 'Ravi Kumar', age: 34, symptoms: 'Severe chest pain, shortness of breath', time: '2 min ago', urgency: 'critical', status: 'Incoming' },
  { id: 'ER-002', patient: 'Meena Devi', age: 62, symptoms: 'High fever (104°F), confusion, vomiting', time: '15 min ago', urgency: 'high', status: 'In Review' },
  { id: 'ER-003', patient: 'Ankit Sharma', age: 8, symptoms: 'Rash on body, high fever, won\'t eat', time: '40 min ago', urgency: 'medium', status: 'Pending' },
  { id: 'ER-004', patient: 'Sita Bai', age: 45, symptoms: 'Severe headache, blurred vision, nausea', time: '1 hr ago', urgency: 'high', status: 'In Review' },
];

const urgencyColors = {
  critical: { bg: 'rgba(255,71,87,0.15)', text: '#ff4757', border: 'rgba(255,71,87,0.3)', label: '🔴 CRITICAL' },
  high:     { bg: 'rgba(255,159,0,0.15)', text: '#ff9f00', border: 'rgba(255,159,0,0.3)', label: '🟠 HIGH' },
  medium:   { bg: 'rgba(255,215,0,0.1)',  text: '#ffd700', border: 'rgba(255,215,0,0.25)', label: '🟡 MEDIUM' },
};

export default function StaffDashboardPage() {
  const router = useRouter();
  const [staff, setStaff] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getItem('staffSession');
    if (!session) { router.push('/auth/smart-er'); return; }
    setStaff(JSON.parse(session));
    setLoaded(true);
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem('staffSession');
    router.push('/auth/smart-er');
  }

  if (!loaded) return <LoadingScreen />;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(255,71,87,0.1), rgba(192,57,43,0.06))', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #ff4757, #c0392b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 0 20px rgba(255,71,87,0.4)' }}>🏥</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4b8', animation: 'er-pulse 2s infinite', display: 'inline-block' }} />
                <span style={{ color: '#00d4b8', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>SMART ER — LIVE</span>
              </div>
              <h2 style={{ color: '#f0f6ff', marginBottom: 2 }}>{staff?.name}</h2>
              <p style={{ color: '#8ba3c0', fontSize: '0.85rem' }}>{staff?.role} · {staff?.hospital}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(0,212,184,0.1)', border: '1px solid rgba(0,212,184,0.25)', color: '#00d4b8', fontSize: '0.75rem', fontWeight: 600 }}>
              {MOCK_CASES.length} Active Cases
            </span>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container section" style={{ maxWidth: 1200 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Incoming', value: '1', color: '#ff4757', icon: '🔴' },
            { label: 'In Review', value: '2', color: '#ff9f00', icon: '🟠' },
            { label: 'Pending', value: '1', color: '#ffd700', icon: '🟡' },
            { label: 'Resolved Today', value: '7', color: '#00d4b8', icon: '✅' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#8ba3c0', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedCase ? '1fr 380px' : '1fr', gap: 24 }}>
          {/* Cases list */}
          <div>
            <h3 style={{ marginBottom: 20, color: '#8ba3c0', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Incoming Patient Cases
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MOCK_CASES.map(c => {
                const u = urgencyColors[c.urgency];
                return (
                  <div key={c.id} className="card" style={{
                    borderColor: u.border, cursor: 'pointer',
                    background: selectedCase?.id === c.id ? u.bg : 'var(--bg-card)',
                    transition: 'all 0.2s',
                  }} onClick={() => setSelectedCase(selectedCase?.id === c.id ? null : c)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: '#f0f6ff' }}>{c.patient}</span>
                          <span style={{ fontSize: '0.75rem', color: '#8ba3c0' }}>Age: {c.age}</span>
                          <span style={{ fontSize: '0.75rem', color: '#4a6481' }}>· {c.time}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>{c.symptoms}</p>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, background: u.bg, color: u.text, border: `1px solid ${u.border}` }}>{u.label}</span>
                          <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: '#8ba3c0' }}>{c.status}</span>
                          <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: '#4a6481' }}>#{c.id}</span>
                        </div>
                      </div>
                      <span style={{ color: '#4a6481', fontSize: 18, flexShrink: 0 }}>{selectedCase?.id === c.id ? '▲' : '▼'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case detail panel */}
          {selectedCase && (
            <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
              <div className="card" style={{ borderColor: urgencyColors[selectedCase.urgency].border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ color: '#f0f6ff' }}>Case Detail</h3>
                  <button onClick={() => setSelectedCase(null)} style={{ background: 'none', border: 'none', color: '#8ba3c0', cursor: 'pointer', fontSize: 20 }}>×</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    ['Patient', selectedCase.patient],
                    ['Age', `${selectedCase.age} years`],
                    ['Case ID', `#${selectedCase.id}`],
                    ['Reported', selectedCase.time],
                    ['Status', selectedCase.status],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#4a6481', fontSize: '0.85rem' }}>{label}</span>
                      <span style={{ color: '#f0f6ff', fontSize: '0.85rem', fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                  <div>
                    <p style={{ color: '#4a6481', fontSize: '0.85rem', marginBottom: 6 }}>Symptoms Reported</p>
                    <p style={{ color: '#f0f6ff', fontSize: '0.9rem', lineHeight: 1.6, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>{selectedCase.symptoms}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>✅ Accept Case</button>
                    <button className="btn btn-outline" style={{ width: '100%' }}>📞 Contact Patient</button>
                    <button className="btn btn-ghost" style={{ width: '100%', fontSize: '0.875rem' }}>🔄 Reassign Case</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hospital Management */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ marginBottom: 20, color: '#8ba3c0', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hospital Management</h3>
          <div className="grid-3">
            {[
              { icon: '🏥', title: 'Manage Hospital Info', desc: 'Update hospital contact details, working hours, and available services.' },
              { icon: '📋', title: 'Patient Reports', desc: 'Access and export patient consultation histories and AI-generated summaries.' },
              { icon: '📊', title: 'Emergency Analytics', desc: 'View trends in emergency requests, response times, and case outcomes.' },
            ].map(item => (
              <div key={item.title} className="card">
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{item.icon}</span>
                <h3 style={{ marginBottom: 8, color: '#f0f6ff' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: 20 }}>{item.desc}</p>
                <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#8ba3c0', cursor: 'not-allowed', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }} disabled>
                  🔜 Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(255,71,87,0.2)', borderTop: '3px solid #ff4757', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#8ba3c0' }}>Loading Smart ER Dashboard...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
