import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrackingData } from '../services/api';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const STATUS_STEPS = ['pending', 'confirmed', 'in_transit', 'delivered'];

function TrackingPage() {
  const { bookingId } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [MapComponent, setMapComponent] = useState(null);

  // Lazy-load map to avoid SSR issues
  useEffect(() => {
    import('../components/MapComponent').then((mod) => setMapComponent(() => mod.default));
  }, []);

  const fetchTracking = useCallback(async () => {
    try {
      const res = await getTrackingData(bookingId);
      setTracking(res.data);
      if (res.data.currentLocation) setCurrentLocation(res.data.currentLocation);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tracking data.');
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchTracking();
    const socket = io(SOCKET_URL);
    socket.emit('join_tracking', bookingId);
    socket.on('location_updated', (data) => {
      setCurrentLocation({ lat: data.lat, lng: data.lng });
    });
    socket.on('status_updated', (data) => {
      setTracking((prev) => prev ? { ...prev, status: data.status } : prev);
    });
    const interval = setInterval(fetchTracking, 30000);
    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [bookingId, fetchTracking]);

  const getStatusIndex = (status) => STATUS_STEPS.indexOf(status);

  if (loading) return <div className="loading"><div className="spinner" /></div>;
  if (error) return (
    <div className="tracking-page">
      <div className="alert alert-error" style={{ maxWidth: 600, margin: '2rem auto' }}>⚠️ {error}</div>
      <div style={{ textAlign: 'center' }}><Link to="/history" className="btn btn-primary">← My Bookings</Link></div>
    </div>
  );

  const statusIdx = getStatusIndex(tracking?.status);

  return (
    <div className="tracking-page">
      <div className="tracking-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>🗺️ Live Tracking</h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Booking ID: {bookingId}</p>
          </div>
          <span className={`status-badge status-${tracking?.status}`}>
            {tracking?.status?.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Progress Steps */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '16px', left: '10%', right: '10%', height: '4px', background: '#e5e7eb', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '16px', left: '10%', width: `${(statusIdx / (STATUS_STEPS.length - 1)) * 80}%`, height: '4px', background: '#2563eb', zIndex: 1, transition: 'width 0.5s' }} />
            {STATUS_STEPS.map((step, i) => (
              <div key={step} style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: i <= statusIdx ? '#2563eb' : '#e5e7eb',
                  color: i <= statusIdx ? 'white' : '#9ca3af',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 0.5rem', fontWeight: 700, fontSize: '0.85rem',
                  transition: 'background 0.3s'
                }}>
                  {i < statusIdx ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '0.75rem', color: i <= statusIdx ? '#2563eb' : '#9ca3af', fontWeight: i <= statusIdx ? 700 : 400, textTransform: 'capitalize' }}>
                  {step.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        {MapComponent && (
          <div className="tracking-map" style={{ marginBottom: '1.5rem' }}>
            <MapComponent
              pickupCoords={tracking?.pickupLocation?.lat ? tracking.pickupLocation : null}
              dropCoords={tracking?.dropLocation?.lat ? tracking.dropLocation : null}
              currentCoords={currentLocation}
              height="400px"
            />
          </div>
        )}
        {!MapComponent && (
          <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            🗺️ Loading map...
          </div>
        )}

        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>📍 Route Details</h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Pickup:</strong> {tracking?.pickupLocation?.address}</p>
            <p><strong>Drop:</strong> {tracking?.dropLocation?.address}</p>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>📊 Trip Info</h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Status:</strong> <span className={`status-badge status-${tracking?.status}`}>{tracking?.status}</span></p>
            <p><strong>Updates refresh</strong> every 30 seconds</p>
          </div>
        </div>

        {tracking?.status === 'delivered' && (
          <div className="alert alert-success" style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            🎉 Your shipment has been delivered successfully!
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/history" className="btn btn-outline">← My Bookings</Link>
          <Link to="/book" className="btn btn-primary">📦 Book Another</Link>
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
