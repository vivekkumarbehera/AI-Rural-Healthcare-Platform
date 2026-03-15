'use client';
// app/faq/page.js — FAQ Page
import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'About the App',
    items: [
      { q: 'Is this a real doctor?', a: 'No. This app is powered by AI and provides health guidance only. It is not staffed by doctors and cannot replace real medical care. Always consult a qualified healthcare professional for medical decisions.' },
      { q: 'Can it diagnose diseases?', a: 'No. The AI can suggest possible conditions based on reported symptoms, but it does not provide official diagnoses. Only a licensed medical professional can diagnose a disease.' },
      { q: 'Is my data private?', a: 'Yes. Your health information is encrypted and stored securely. We do not sell or share your data with third parties without your explicit consent.' },
      { q: 'Does it work without internet?', a: 'The AI features require an internet connection. However, once you have saved hospital contact information or health reports, you can access them offline.' },
    ],
  },
  {
    category: 'Emergency & Smart ER',
    items: [
      { q: 'What should I do in a medical emergency?', a: 'Call your local emergency number immediately. You can also use the 🚨 Smart ER button in the app to alert connected hospital staff who will coordinate a response.' },
      { q: 'What is Smart ER?', a: 'Smart ER is a dedicated portal for verified hospital staff. Patients can send emergency requests that are instantly routed to hospital staff, who can view patient summaries and coordinate care.' },
      { q: 'How does Smart ER login work?', a: 'Hospital staff need a verified email, password, and a unique staff code provided by their institution. This ensures that only authorized medical personnel can access the emergency portal.' },
    ],
  },
  {
    category: 'Account & Access',
    items: [
      { q: 'How do I create an account?', a: 'Click "Create Account" on the home page or sign-in page. Enter your name, email address, and a password of at least 6 characters. Your account is created instantly.' },
      { q: 'I forgot my password. What do I do?', a: 'Password reset via email is coming soon. In the meantime, please contact support and we will help you recover access to your account.' },
      { q: 'What is the difference between a user account and staff account?', a: 'User accounts are for patients and community members seeking health guidance. Staff accounts (via Smart ER Login) are for verified hospital staff who manage emergency responses.' },
      { q: 'Is the app free?', a: 'Yes, the basic features are completely free. Premium features like unlimited AI consultations and PDF report history may be introduced in future updates.' },
    ],
  },
  {
    category: 'AI Health Assistant',
    items: [
      { q: 'How accurate is the AI symptom checker?', a: 'The AI is trained on extensive medical knowledge and provides high-quality guidance. However, accuracy depends on how clearly you describe your symptoms. It is a support tool, not a replacement for clinical assessment.' },
      { q: 'What languages does the assistant support?', a: 'Currently the assistant works best in English. Multilingual support for Hindi and regional languages is planned for future updates.' },
      { q: 'Can I use the app for children?', a: 'Yes, but please note the AI is general-purpose. For children, always follow up with a pediatrician, especially for high fevers, breathing difficulties, or any serious symptoms.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          cursor: 'pointer', padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ color: '#f0f6ff', fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 }}>{q}</span>
        <span style={{
          fontSize: 20, color: '#00d4b8', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.25s ease',
        }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, paddingRight: 40 }}>
          <p style={{ color: '#8ba3c0', lineHeight: 1.8, fontSize: '0.95rem' }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: 128, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 64 }}>
          <span className="badge badge-teal" style={{ marginBottom: 16 }}>Help Center</span>
          <h1 style={{ marginBottom: 20 }}>
            Frequently Asked <span style={{ background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
          </h1>
          <p style={{ maxWidth: 500, margin: '0 auto' }}>
            Everything you need to know about using AI Rural Health Care. Can't find your answer? Contact us anytime.
          </p>
        </div>

        {/* Disclaimer note */}
        <div style={{
          background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)',
          borderRadius: 12, padding: '16px 20px', marginBottom: 48,
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>🩺</span>
          <p style={{ fontSize: '0.875rem', color: '#8ba3c0' }}>
            <strong style={{ color: '#ff6b6b' }}>Reminder:</strong> This app provides AI guidance only — it is not a replacement for professional medical advice. Always consult a real doctor for diagnosis and treatment.
          </p>
        </div>

        {/* FAQ Categories */}
        {faqs.map((cat) => (
          <div key={cat.category} className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ color: '#00d4b8', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {cat.category}
            </h3>
            {cat.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        {/* Contact */}
        <div className="text-center" style={{ marginTop: 48, padding: '40px', background: 'rgba(0,212,184,0.04)', border: '1px solid rgba(0,212,184,0.15)', borderRadius: 16 }}>
          <h3 style={{ marginBottom: 12 }}>Still have questions?</h3>
          <p style={{ marginBottom: 24, color: '#8ba3c0' }}>Our support team is available to help with any technical or health-related questions about the app.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/auth/signin?tab=signup" className="btn btn-primary">Create Free Account</Link>
            <Link href="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
