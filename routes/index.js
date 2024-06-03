const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Category = require('../models/group');

// Home page
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('index', { categories });
});

module.exports = router;
