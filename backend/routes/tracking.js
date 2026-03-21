const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// GET /api/tracking/:bookingId
router.get('/:bookingId', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('truck');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json({
      bookingId: booking._id,
      status: booking.status,
      pickupLocation: booking.pickupLocation,
      dropLocation: booking.dropLocation,
      currentLocation: booking.truck ? booking.truck.currentLocation : null,
      trackingLogs: booking.trackingLogs,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/tracking/:bookingId/log
router.post('/:bookingId/log', auth, async (req, res) => {
  try {
    const { lat, lng, status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { $push: { trackingLogs: { lat, lng, status, timestamp: new Date() } } },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const io = req.app.get('io');
    if (io) {
      io.to(`tracking_${booking._id}`).emit('location_updated', { lat, lng, status, bookingId: booking._id });
    }

    res.json({ message: 'Location logged', log: { lat, lng, status } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
