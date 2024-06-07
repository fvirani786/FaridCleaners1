const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    reviews: [{type: mongoose.Schema.Types.ObjectId,ref:'Review' }]
    
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
