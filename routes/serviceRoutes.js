const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).send('Service not found');
        res.json(service);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new service
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
        const service = new Service({ name, price });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
        if (!service) return res.status(404).send('Service not found');
        res.json(service);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).send('Service not found');
        res.send('Service deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
