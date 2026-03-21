const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/sslogistics', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// API Routes
app.post('/api/booking', (req, res) => {
    // Handle truck booking
    const { userId, truckId, pickupLocation, dropLocation } = req.body;
    // Save booking to database logic shall be implemented here
    res.status(201).send({ message: 'Booking created', bookingId: '123456' });
});

app.get('/api/bookings/:userId', (req, res) => {
    // Fetch user bookings logic shall be implemented here
    res.status(200).send({ bookings: [] });
});

// Socket.io real-time tracking
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('trackLocation', (data) => {
        // Logic to update location in real-time
        console.log('Tracking data received:', data);
        socket.broadcast.emit('locationUpdate', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});