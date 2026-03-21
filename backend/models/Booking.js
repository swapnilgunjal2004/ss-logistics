const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
    truckType: { type: String, enum: ['Mini', 'Small', 'Medium', 'Large', 'XL'], required: true },
    pickupLocation: {
      address: { type: String, required: true },
      lat: { type: Number },
      lng: { type: Number },
    },
    dropLocation: {
      address: { type: String, required: true },
      lat: { type: Number },
      lng: { type: Number },
    },
    distance: { type: Number }, // km
    estimatedPrice: { type: Number },
    finalPrice: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    scheduledDate: { type: Date },
    goodsDescription: { type: String },
    contactPhone: { type: String },
    trackingLogs: [
      {
        lat: Number,
        lng: Number,
        timestamp: { type: Date, default: Date.now },
        status: String,
      },
    ],
    cancellationReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
