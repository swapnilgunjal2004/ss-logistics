const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['Mini', 'Small', 'Medium', 'Large', 'XL'],
      required: true,
    },
    capacity: { type: String, required: true }, // e.g. "1 Ton"
    pricePerKm: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    image: { type: String, default: '🚛' },
    description: { type: String },
    features: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    licensePlate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Truck', truckSchema);
