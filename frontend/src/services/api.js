import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ss_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/users/me');

// Trucks
export const getAvailableTrucks = () => api.get('/trucks/available');
export const getTrucksByType = (type) => api.get(`/trucks/type/${type}`);

// Bookings
export const createBooking = (data) => api.post('/bookings/create', data);
export const getMyBookings = () => api.get('/bookings/my');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id, reason) => api.put(`/bookings/${id}/cancel`, { cancellationReason: reason });

// Tracking
export const getTrackingData = (bookingId) => api.get(`/tracking/${bookingId}`);

export default api;
