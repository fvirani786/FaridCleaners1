const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const serviceSchema = new mongoose.Schema({
    type: { type: String,  required: true },
    price: { type: Number, required: true},
    description: { type: String, required: true},



}, { timestamps: true });



const Service = mongoose.model('Service', serviceSchema);


module.exports = Service;



