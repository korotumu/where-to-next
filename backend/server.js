// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cityRoutes = require('./routes/cityRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/nomad_cities', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/cities', cityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// models/City.js
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  country: String,
  latitude: Number,
  longitude: Number,
  climate: String,
  costOfLiving: Number,
  languages: [String],
  safety: Number,
  altitude: Number,
  population: Number
});

module.exports = mongoose.model('City', CitySchema);

// routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const city = new City(req.body);
  try {
    const newCity = await city.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add more routes for updating and deleting cities

module.exports = router;
