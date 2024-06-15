const express = require('express');
const router = express.Router();


const Service = require('../models/Service');


router.get('/', async (req, res) => {
  try {
    
    const services = await Service.find();

    
    res.render('/indexRoutes', { services });
  } catch (err) {
    
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
