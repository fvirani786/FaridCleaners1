const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const serviceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    servicesOffered: [{ type: String, required: true }],
    contactPerson: { type: String, required: true },

}, { timestamps: true });


// create the model and export it
const Service = mongoose.model('Service', serviceSchema);

// make this model avaliable for the index file
module.exports = Service;
