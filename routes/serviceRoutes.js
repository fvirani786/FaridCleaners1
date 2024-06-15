const express = require('express');
const router = express.Router();
const Service = require('../models/Service');


router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).send('Service not found');
        res.json(service);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


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
