import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../services/api';

const TRUCK_TYPES = [
  { type: 'Mini', emoji: '🚐', capacity: '500 Kg', basePrice: 200, pricePerKm: 10 },
  { type: 'Small', emoji: '🚚', capacity: '1 Ton', basePrice: 350, pricePerKm: 14 },
  { type: 'Medium', emoji: '🚛', capacity: '3 Tons', basePrice: 500, pricePerKm: 18 },
  { type: 'Large', emoji: '🚜', capacity: '7 Tons', basePrice: 800, pricePerKm: 22 },
  { type: 'XL', emoji: '🏗️', capacity: '15 Tons', basePrice: 1200, pricePerKm: 30 },
];

function BookingPage({ user }) {
  const navigate = useNavigate();
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [form, setForm] = useState({
    pickupAddress: '',
    dropAddress: '',
    distance: '',
    scheduledDate: '',
    goodsDescription: '',
    contactPhone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calcPrice = () => {
    if (!selectedTruck || !form.distance) return null;
    const dist = parseFloat(form.distance);
    if (isNaN(dist) || dist <= 0) return null;
    return selectedTruck.basePrice + dist * selectedTruck.pricePerKm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTruck) { setError('Please select a truck type.'); return; }
    if (!form.pickupAddress || !form.dropAddress) { setError('Please fill pickup and drop locations.'); return; }
    if (!form.distance || parseFloat(form.distance) <= 0) { setError('Please enter a valid distance.'); return; }

    setLoading(true);
    setError('');
    try {
      const price = calcPrice();
      const payload = {
        truckType: selectedTruck.type,
        pickupLocation: { address: form.pickupAddress },
        dropLocation: { address: form.dropAddress },
        distance: parseFloat(form.distance),
        estimatedPrice: price,
        scheduledDate: form.scheduledDate || undefined,
        goodsDescription: form.goodsDescription,
        contactPhone: form.contactPhone,
      };
      const res = await createBooking(payload);
      navigate(`/tracking/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const price = calcPrice();

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>📦 Book a Truck</h1>
          <p style={{ color: '#6b7280' }}>Fill in your details and we'll get a truck to you fast</p>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {/* Truck Selection */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>1. Select Truck Type</h3>
          <div className="truck-grid">
            {TRUCK_TYPES.map((t) => (
              <div
                key={t.type}
                className={`truck-card ${selectedTruck?.type === t.type ? 'selected' : ''}`}
                onClick={() => setSelectedTruck(t)}
              >
                <div className="emoji">{t.emoji}</div>
                <h3>{t.type}</h3>
                <div className="capacity">⚖️ {t.capacity}</div>
                <div className="price">₹{t.basePrice} base</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>+₹{t.pricePerKm}/km</div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>2. Enter Locations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>📍 Pickup Address *</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={form.pickupAddress}
                  onChange={handleChange}
                  placeholder="e.g. 123 MG Road, Pune"
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>🏁 Drop Address *</label>
                <input
                  type="text"
                  name="dropAddress"
                  value={form.dropAddress}
                  onChange={handleChange}
                  placeholder="e.g. 456 FC Road, Mumbai"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>3. Shipment Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>📏 Distance (km) *</label>
                <input
                  type="number"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="1"
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>📅 Scheduled Date</label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>📦 Goods Description</label>
                <input
                  type="text"
                  name="goodsDescription"
                  value={form.goodsDescription}
                  onChange={handleChange}
                  placeholder="e.g. Furniture, Electronics"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>📞 Contact Phone *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          {price && (
            <div className="price-calc" style={{ marginBottom: '1.5rem' }}>
              <h3>💰 Estimated Price</h3>
              <div className="total">₹{price.toLocaleString()}</div>
              <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.3rem' }}>
                ₹{selectedTruck.basePrice} base + ₹{selectedTruck.pricePerKm} × {form.distance} km
              </p>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
            {loading ? '⏳ Booking...' : '✅ Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
