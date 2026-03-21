import React from 'react';
import { Link } from 'react-router-dom';

const TRUCK_TYPES = [
  { type: 'Mini', emoji: '🚐', capacity: '500 Kg', price: 'From ₹200', desc: 'Small household & city moves' },
  { type: 'Small', emoji: '🚚', capacity: '1 Ton', price: 'From ₹350', desc: 'Small business deliveries' },
  { type: 'Medium', emoji: '🚛', capacity: '3 Tons', price: 'From ₹500', desc: 'Office & shop relocation' },
  { type: 'Large', emoji: '🚜', capacity: '7 Tons', price: 'From ₹800', desc: 'Heavy goods & bulk transport' },
  { type: 'XL', emoji: '🏗️', capacity: '15 Tons', price: 'From ₹1200', desc: 'Industrial & commercial cargo' },
];

const FEATURES = [
  { icon: '📍', title: 'Real-time GPS Tracking', desc: 'Track your shipment live on an interactive map with live location updates.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'Get instant price calculation based on distance and truck type. No hidden charges.' },
  { icon: '⚡', title: 'Quick Booking', desc: 'Book a truck in under 2 minutes. Confirm in seconds, dispatch within the hour.' },
  { icon: '📱', title: '24/7 WhatsApp Support', desc: 'Our team is always available. Chat directly on WhatsApp for instant assistance.' },
  { icon: '🔒', title: 'Secure & Reliable', desc: 'Your goods are insured and handled with care. Professional drivers guaranteed.' },
  { icon: '🗺️', title: 'Pan-India Network', desc: 'Extensive network covering major cities and remote areas across India.' },
];

function LandingPage({ user }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="truck-emoji">🚛</span>
          <h1>SS Logistics</h1>
          <p>Professional Truck Booking & Real-time Tracking Platform</p>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>
            Book trucks instantly, track shipments live, and connect with drivers — all in one place.
          </p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/book" className="btn btn-secondary btn-lg">📦 Book a Truck Now</Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-secondary btn-lg">🚀 Get Started Free</Link>
                <Link to="/login" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>Login</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-strip">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Trucks Available</p>
          </div>
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Deliveries Done</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Cities Covered</p>
          </div>
          <div className="stat-item">
            <h3>4.8⭐</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>

      {/* Truck Types */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Choose Your Truck</h2>
          <p className="section-subtitle">We have the right size for every job</p>
          <div className="truck-grid">
            {TRUCK_TYPES.map((t) => (
              <div className="truck-card" key={t.type}>
                <div className="emoji">{t.emoji}</div>
                <h3>{t.type} Truck</h3>
                <div className="capacity">⚖️ {t.capacity}</div>
                <div className="price">{t.price}</div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {user ? (
              <Link to="/book" className="btn btn-primary btn-lg">Book Now →</Link>
            ) : (
              <Link to="/register" className="btn btn-primary btn-lg">Sign Up to Book →</Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose SS Logistics?</h2>
          <p className="section-subtitle">Everything you need for seamless logistics</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '1rem' }}>{f.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to Ship?</h2>
        <p style={{ opacity: 0.9, marginBottom: '2rem', fontSize: '1.1rem' }}>
          Join thousands of businesses that trust SS Logistics for their delivery needs.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <Link to="/book" className="btn btn-secondary btn-lg">📦 Book a Truck</Link>
          ) : (
            <Link to="/register" className="btn btn-secondary btn-lg">🚀 Start Free Today</Link>
          )}
          <a href="https://wa.me/918483889717" className="btn btn-lg" style={{ background: '#25d366', color: 'white' }} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
