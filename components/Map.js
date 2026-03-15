// components/Map.js
'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a red icon for hospitals
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically update map center
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function Map({ location, hospitals }) {
  // Default to a central location (e.g., India) if no location is provided
  const defaultCenter = [20.5937, 78.9629];
  const center = location || defaultCenter;
  const zoom = location ? 13 : 4;

  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <MapUpdater center={location} />
        
        {/* FREE OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {location && (
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Hospital Markers */}
        {hospitals.map(h => (
          <Marker key={h.id} position={[h.lat, h.lon]} icon={hospitalIcon}>
            <Popup>
              <strong style={{ color: '#000' }}>{h.name}</strong><br/>
              <span style={{ color: '#555' }}>{h.type}</span><br/>
              <span style={{ color: '#555' }}>📞 {h.phone}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
