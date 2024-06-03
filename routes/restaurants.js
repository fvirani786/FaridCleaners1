const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get all restaurants or search
router.get('/', async (req, res) => {
  const { location, category } = req.query;
  let query = {};
  if (location) query.location = location;
  if (category) query.category = category;

  const restaurants = await Restaurant.find(query).populate('category');
  res.render('restaurants/index', { restaurants });
});

// Get a single restaurant by id
router.get('/:id', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('category');
  res.render('restaurants/show', { restaurant });
});

module.exports = router;
