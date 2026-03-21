import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>🚛 SS Logistics</h4>
          <p>Professional truck booking and real-time tracking platform serving businesses across India.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/book">Book a Truck</a>
          <a href="/history">My Bookings</a>
          <a href="/register">Sign Up</a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>📞 +91 8483889717</p>
          <p>📧 swapnilgunjal2004@gmail.com</p>
          <p>🕐 24/7 Support via WhatsApp</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SS Logistics. All rights reserved. | Professional Transport Solutions</p>
      </div>
    </footer>
  );
}

export default Footer;
