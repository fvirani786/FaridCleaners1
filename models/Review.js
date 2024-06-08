const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Review', ReviewSchema);

