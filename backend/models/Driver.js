const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    licenseNumber: { type: String, required: true },
    photo: { type: String },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    totalTrips: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    assignedTruck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', driverSchema);
