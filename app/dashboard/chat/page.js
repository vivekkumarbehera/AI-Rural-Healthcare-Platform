'use client';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ChatDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I am your AI Health Assistant. Please describe your symptoms or ask me any health-related questions. Remember this is for guidance only, not a medical diagnosis." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (status === 'loading' || !session) return null;

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Create history array without the initial greeting if it's the first user message
      const historyToSend = messages.length === 1 ? [] : messages.slice(1);
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...historyToSend, userMessage] }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error communicating with the server. Please check if the API key is configured or try again later.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
        
        {/* Header */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => router.push('/dashboard')} className="btn btn-ghost" style={{ padding: '8px 12px' }}>
            ← Back
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>AI Health Assistant</h1>
            <p style={{ color: '#8ba3c0', fontSize: '0.9rem' }}>Powered by Gemini API</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden', maxHeight: 'calc(100vh - 200px)' }}>
          
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex', gap: 12, alignItems: 'flex-start'
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>🤖</div>
                )}
                
                <div style={{
                  background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(0,212,184,0.15), rgba(30,144,255,0.15))' : 'rgba(255,255,255,0.05)',
                  border: msg.role === 'user' ? '1px solid rgba(0,212,184,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 16px', borderRadius: 16,
                  borderTopRightRadius: msg.role === 'user' ? 4 : 16,
                  borderTopLeftRadius: msg.role === 'assistant' ? 4 : 16,
                }}>
                  <p style={{ color: msg.role === 'user' ? '#fff' : '#e2e8f0', fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4b8, #1e90ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>🤖</div>
                <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 16, borderTopLeftRadius: 4, color: '#8ba3c0', fontSize: '0.9rem' }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your symptoms or questions here..."
                style={{
                  flex: 1, padding: '14px 20px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: '1rem', outline: 'none'
                }}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ borderRadius: 100, padding: '0 24px' }}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </form>
            <p style={{ textAlign: 'center', color: '#4a6481', fontSize: '0.75rem', marginTop: 12 }}>
              AI can make mistakes. Always verify important medical information with a doctor.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
