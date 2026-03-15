'use client';
// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(5, 13, 26, 0.95)',
      padding: '48px 24px 32px',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d4b8, #1e90ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>❤️</div>
              <span style={{ fontWeight: 700, color: '#f0f6ff' }}>AI<span style={{ color: '#00d4b8' }}>Health</span></span>
            </div>
            <p style={{ color: '#4a6481', fontSize: '0.875rem', lineHeight: 1.6 }}>
              AI-powered health guidance for rural communities. Available 24/7.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: '#f0f6ff', fontWeight: 600, marginBottom: 16, fontSize: '0.9rem' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['/', 'Home'], ['/about', 'About'], ['/faq', 'FAQ'], ['/auth/signin', 'Sign In']].map(([href, label]) => (
                <Link key={href} href={href} style={{ color: '#4a6481', fontSize: '0.875rem', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#00d4b8'}
                  onMouseLeave={e => e.target.style.color = '#4a6481'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 style={{ color: '#f0f6ff', fontWeight: 600, marginBottom: 16, fontSize: '0.9rem' }}>⚠️ Disclaimer</h4>
            <p style={{ color: '#4a6481', fontSize: '0.8rem', lineHeight: 1.7 }}>
              This app provides AI-based guidance only. It does <strong style={{ color: '#8ba3c0' }}>not</strong> replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: '#4a6481', fontSize: '0.8rem' }}>
            © 2024 AI Rural Health Care. For guidance only.
          </p>
          <Link href="/auth/smart-er" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#ff4757', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
          }}>
            🚨 Smart ER Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
