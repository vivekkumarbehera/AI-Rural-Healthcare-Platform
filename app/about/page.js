// app/about/page.js — About Page
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 128, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 64 }}>
          <span className="badge badge-teal" style={{ marginBottom: 16 }}>About the Project</span>
          <h1 style={{ marginBottom: 20 }}>
            AI Health for <span style={{ background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Rural Communities</span>
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
            A mission to bring quality health guidance to underserved rural areas through artificial intelligence.
          </p>
        </div>

        {/* Mission */}
        <div className="card" style={{ marginBottom: 32, borderColor: 'rgba(0,212,184,0.2)', background: 'linear-gradient(135deg, rgba(0,212,184,0.05), rgba(30,144,255,0.03))' }}>
          <h2 style={{ marginBottom: 16, color: '#00d4b8', fontSize: '1.4rem' }}>🎯 Our Mission</h2>
          <p style={{ marginBottom: 16 }}>
            Millions of people living in rural areas lack access to timely healthcare. Long distances to hospitals, shortage of doctors, and lack of health literacy create dangerous delays in medical attention.
          </p>
          <p>
            <strong style={{ color: '#f0f6ff' }}>AI Rural Health Care</strong> bridges this gap by putting an AI health assistant in everyone's pocket — providing instant guidance, connecting users with the nearest facilities, and enabling emergency response through our Smart ER system.
          </p>
        </div>

        {/* What This App Does */}
        <h2 style={{ marginBottom: 24 }}>What This App Does</h2>
        <div className="grid-2" style={{ marginBottom: 48 }}>
          {[
            { icon: '🤖', title: 'AI Symptom Analysis', desc: 'Using Claude AI, users describe symptoms and receive intelligent guidance on urgency, possible conditions, and recommended actions.' },
            { icon: '📍', title: 'Hospital Locator', desc: 'GPS-powered map showing nearby clinics, hospitals, and health centers with contact details and estimated distance.' },
            { icon: '🚨', title: 'Smart ER Portal', desc: 'A dedicated login portal for hospital staff to receive emergency alerts, view patient summaries, and coordinate responses.' },
            { icon: '📄', title: 'Health Reports', desc: 'Every AI consultation can be saved and exported as a PDF for sharing with doctors or keeping personal health records.' },
          ].map(item => (
            <div key={item.title} className="card">
              <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{item.icon}</span>
              <h3 style={{ marginBottom: 8, color: '#f0f6ff' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Technology */}
        <div className="card" style={{ marginBottom: 32, borderColor: 'rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.04)' }}>
          <h2 style={{ marginBottom: 16, color: '#a855f7', fontSize: '1.4rem' }}>🧠 AI Technology</h2>
          <p style={{ marginBottom: 12 }}>
            The AI Health Assistant is powered by <strong style={{ color: '#f0f6ff' }}>Claude by Anthropic</strong> — one of the most capable and safety-focused AI systems available. Claude is specifically configured to:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Collect symptom descriptions in a natural, conversational way',
              'Suggest possible conditions based on reported symptoms',
              'Recommend whether to seek immediate help or home care',
              'Avoid making definitive diagnoses (guidance only)',
              'Respond in the local language for accessibility',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#8ba3c0', fontSize: '0.9rem' }}>
                <span style={{ color: '#a855f7', marginTop: 2 }}>◆</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.25)',
          borderRadius: 16, padding: '24px 28px', marginBottom: 48,
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: 12 }}>⚠️ Important Medical Disclaimer</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
            <strong style={{ color: '#f0f6ff' }}>This application provides guidance, not diagnosis.</strong> The information and suggestions provided by the AI Health Assistant are for informational and educational purposes only. They are <em>not</em> intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or observed in this app.
          </p>
          <p style={{ marginTop: 12, fontSize: '0.85rem', color: '#4a6481' }}>
            In case of a medical emergency, call your local emergency services immediately.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/signin?tab=signup" className="btn btn-primary" style={{ marginRight: 16 }}>Get Started Free</Link>
          <Link href="/faq" className="btn btn-outline">Read the FAQ</Link>
        </div>
      </div>
    </div>
  );
}
