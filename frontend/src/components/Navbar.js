import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span>🚛</span> SS Logistics
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {user && <li><Link to="/book">Book</Link></li>}
          {user && <li><Link to="/history">My Bookings</Link></li>}
          {user ? (
            <>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  👤 {user.name}
                </span>
              </li>
              <li>
                <button className="nav-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li>
                <Link to="/register" className="nav-btn nav-btn-primary">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
