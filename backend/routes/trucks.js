const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');

// Seed default trucks if none exist
const seedTrucks = async () => {
  const count = await Truck.countDocuments();
  if (count === 0) {
    await Truck.insertMany([
      { name: 'Mini Loader', type: 'Mini', capacity: '500 Kg', pricePerKm: 10, basePrice: 200, description: 'Perfect for small household items', features: ['Up to 500 Kg', 'City delivery', 'Quick loading'] },
      { name: 'Small Carrier', type: 'Small', capacity: '1 Ton', pricePerKm: 14, basePrice: 350, description: 'Ideal for small business deliveries', features: ['Up to 1 Ton', 'City & nearby', 'Covered body'] },
      { name: 'Medium Truck', type: 'Medium', capacity: '3 Tons', pricePerKm: 18, basePrice: 500, description: 'Best for office or shop relocations', features: ['Up to 3 Tons', 'State-wide', 'Loading help'] },
      { name: 'Large Truck', type: 'Large', capacity: '7 Tons', pricePerKm: 22, basePrice: 800, description: 'Heavy goods and bulk transport', features: ['Up to 7 Tons', 'Pan India', 'GPS tracked'] },
      { name: 'XL Heavy Mover', type: 'XL', capacity: '15 Tons', pricePerKm: 30, basePrice: 1200, description: 'Industrial and commercial cargo', features: ['Up to 15 Tons', 'Pan India', 'Multi-axle', 'Insurance covered'] },
    ]);
    console.log('🚛 Default trucks seeded');
  }
};
seedTrucks();

// GET /api/trucks/available
router.get('/available', async (req, res) => {
  try {
    const trucks = await Truck.find({ isAvailable: true });
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/trucks/type/:type
router.get('/type/:type', async (req, res) => {
  try {
    const trucks = await Truck.find({ type: req.params.type, isAvailable: true });
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/trucks/:id
router.get('/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/trucks/:id/location
router.put('/:id/location', async (req, res) => {
  try {
    const { lat, lng, address } = req.body;
    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      { currentLocation: { lat, lng, address } },
      { new: true }
    );
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
