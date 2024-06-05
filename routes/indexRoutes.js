const express = require('express');
const router = express.Router();

// Import the Service model
const Service = require('../models/service');

// Define routes

// GET route for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all dry cleaning services from the database (you may filter based on location and other criteria)
    const services = await Service.find();

    // Render the index.ejs template and pass the services as a variable
    res.render('/indexRoutes', { services });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
