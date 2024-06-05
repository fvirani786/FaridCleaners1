const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const serviceSchema = new mongoose.Schema({
    type: { type: String,  required: true },
    price: { type: Number, required: true},
    description: { type: String, required: true},

    //alteration, DC , Laundry

}, { timestamps: true });


// create the model and export it
const Service = mongoose.model('Service', serviceSchema);

// make this model avaliable for the index file
module.exports = Service;


//TEST DATABASE for all the models expect user 
