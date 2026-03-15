'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Dynamically import map components to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(
  () => import('../../../components/Map'),
  { 
    ssr: false,
    loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}><p style={{ color: '#8ba3c0' }}>Loading Map Engine...</p></div>
  }
);

export default function HospitalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  function locateUser() {
    setLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        fetchHospitals(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLoading(false);
        setError("Unable to retrieve your location. Please ensure location services are enabled.");
      }
    );
  }

  async function fetchHospitals(lat, lon) {
    try {
      // Overpass API query for hospitals/clinics within ~10km (0.1 degree)
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:10000,${lat},${lon});
          node["amenity"="clinic"](around:10000,${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;
      
      const res = await fetch(`https://overpass-api.de/api/interpreter`, {
        method: 'POST',
        body: query
      });
      
      const data = await res.json();
      
      const formatted = data.elements.filter(e => e.type === 'node').map(e => ({
        id: e.id,
        name: e.tags?.name || 'Unnamed Facility',
        type: e.tags?.amenity === 'clinic' ? 'Clinic' : 'Hospital',
        phone: e.tags?.phone || 'No phone listed',
        lat: e.lat,
        lon: e.lon
      }));
      
      setHospitals(formatted);
    } catch (err) {
      setError("Failed to load nearby hospitals. The free map API might be rate limited.");
    } finally {
      setLoading(false);
    }
  }

  if (status === 'loading' || !session) return null;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 64 }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => router.push('/dashboard')} className="btn btn-ghost" style={{ padding: '8px 12px' }}>
            ← Back
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Nearby Hospitals</h1>
            <p style={{ color: '#8ba3c0', fontSize: '0.9rem' }}>Powered by OpenStreetMap (Free)</p>
          </div>
        </div>

        <div className="grid-2">
          {/* Controls & List */}
          <div>
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Find Care Near You</h3>
              <p style={{ color: '#8ba3c0', fontSize: '0.9rem', marginBottom: 24 }}>
                We use free, open-source data to find nearby clinics and hospitals. Allow location access to see facilities within 10km.
              </p>
              
              <button 
                onClick={locateUser} 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? '⏳ Locating...' : '📍 Find Clinics Near Me'}
              </button>

              {error && <div className="alert alert-error" style={{ marginTop: 16 }}>{error}</div>}
            </div>

            {hospitals.length > 0 && (
              <div>
                <h3 style={{ marginBottom: 16, color: '#f0f6ff', fontSize: '1.1rem' }}>Results ({hospitals.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '400px', overflowY: 'auto', paddingRight: 8 }}>
                  {hospitals.map(h => (
                    <div key={h.id} style={{ 
                      padding: 16, background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h4 style={{ color: '#00d4b8', fontSize: '1rem' }}>{h.name}</h4>
                        <span style={{ 
                          fontSize: '0.7rem', padding: '2px 8px', borderRadius: 100, 
                          background: h.type === 'Hospital' ? 'rgba(30,144,255,0.1)' : 'rgba(16,185,129,0.1)',
                          color: h.type === 'Hospital' ? '#1e90ff' : '#10b981'
                        }}>
                          {h.type}
                        </span>
                      </div>
                      <p style={{ color: '#8ba3c0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>📞</span> {h.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Area */}
          <div>
            <div style={{ position: 'sticky', top: 100 }}>
              <MapWithNoSSR location={location} hospitals={hospitals} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
