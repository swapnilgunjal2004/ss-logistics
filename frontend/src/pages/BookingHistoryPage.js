import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../services/api';

function BookingHistoryPage({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyBookings()
      .then((res) => setBookings(res.data))
      .catch(() => setError('Could not load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBooking(id, 'Cancelled by user');
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not cancel booking.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div className="history-page">
      <div className="history-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>📦 My Bookings</h1>
            <p style={{ color: '#6b7280' }}>Manage and track your shipments</p>
          </div>
          <Link to="/book" className="btn btn-primary">+ New Booking</Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {bookings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No bookings yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Book your first truck to get started!</p>
            <Link to="/book" className="btn btn-primary btn-lg">📦 Book a Truck</Link>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <div className="booking-item-info">
                <h3>
                  {booking.truckType} Truck
                  <span className={`status-badge status-${booking.status}`} style={{ marginLeft: '0.7rem' }}>
                    {booking.status?.replace('_', ' ')}
                  </span>
                </h3>
                <p>📍 {booking.pickupLocation?.address} → 🏁 {booking.dropLocation?.address}</p>
                <p style={{ marginTop: '0.3rem' }}>
                  💰 ₹{booking.estimatedPrice?.toLocaleString() || '—'} &nbsp;|&nbsp;
                  📏 {booking.distance ? `${booking.distance} km` : '—'} &nbsp;|&nbsp;
                  🗓️ {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="booking-item-actions">
                {booking.status !== 'cancelled' && booking.status !== 'delivered' && (
                  <Link to={`/tracking/${booking._id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                    🗺️ Track
                  </Link>
                )}
                {booking.status === 'pending' && (
                  <button
                    className="btn btn-danger"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
                    onClick={() => handleCancel(booking._id)}
                  >
                    ✕ Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingHistoryPage;
