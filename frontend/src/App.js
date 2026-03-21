import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import TrackingPage from './pages/TrackingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('ss_user');
    const storedToken = localStorage.getItem('ss_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('ss_user', JSON.stringify(userData));
    localStorage.setItem('ss_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('ss_user');
    localStorage.removeItem('ss_token');
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/book" element={user ? <BookingPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/tracking/:bookingId" element={user ? <TrackingPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/history" element={user ? <BookingHistoryPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </Router>
  );
}

export default App;
