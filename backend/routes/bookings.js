const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Truck = require('../models/Truck');

// POST /api/bookings/create
router.post('/create', auth, async (req, res) => {
  try {
    const {
      truckType,
      pickupLocation,
      dropLocation,
      distance,
      estimatedPrice,
      scheduledDate,
      goodsDescription,
      contactPhone,
    } = req.body;

    // Find an available truck of requested type
    const truck = await Truck.findOne({ type: truckType, isAvailable: true });

    const booking = await Booking.create({
      user: req.user.id,
      truck: truck ? truck._id : undefined,
      truckType,
      pickupLocation,
      dropLocation,
      distance,
      estimatedPrice,
      scheduledDate,
      goodsDescription,
      contactPhone,
      status: 'pending',
    });

    // Mark truck unavailable if assigned
    if (truck) {
      await Truck.findByIdAndUpdate(truck._id, { isAvailable: false });
    }

    const populated = await booking.populate('truck');

    // Emit socket event
    const io = req.app.get('io');
    if (io) io.emit('new_booking', populated);

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings/user/:userId
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('truck')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings/my
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('truck')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings/:bookingId
router.get('/:bookingId', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('truck');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/bookings/:bookingId/status
router.put('/:bookingId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status },
      { new: true }
    ).populate('truck');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const io = req.app.get('io');
    if (io) io.to(`tracking_${booking._id}`).emit('status_updated', { status, booking });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/bookings/:bookingId/cancel
router.put('/:bookingId/cancel', auth, async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel a delivered booking' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason || 'Cancelled by user';
    await booking.save();

    // Free up truck
    if (booking.truck) {
      await Truck.findByIdAndUpdate(booking.truck, { isAvailable: true });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
