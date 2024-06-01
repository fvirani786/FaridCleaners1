const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  caloriesBurned: { type: Number }
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
