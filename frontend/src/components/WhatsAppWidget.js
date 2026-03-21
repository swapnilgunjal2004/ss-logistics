import React, { useState } from 'react';

const PHONE = process.env.REACT_APP_WHATSAPP_NUMBER || '8483889717';

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const waUrl = `https://wa.me/91${PHONE}?text=Hello%20SS%20Logistics!%20I%20need%20help%20with%20truck%20booking.`;

  return (
    <div className="whatsapp-widget">
      {open && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <span className="wa-icon">💬</span>
            <div>
              <h4>SS Logistics Support</h4>
              <p>🟢 Typically replies instantly</p>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.5rem' }}>
            Hello! 👋 How can we help you today?
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            📱 Chat on WhatsApp
          </a>
          <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280' }}>
            📞 +91 {PHONE}
          </p>
        </div>
      )}
      <button className="whatsapp-btn" onClick={() => setOpen(!open)} aria-label="WhatsApp Support">
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default WhatsAppWidget;
