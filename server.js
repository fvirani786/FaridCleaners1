const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userController = require('./controllers/userController');
const workoutController = require('./controllers/workoutController');
const auth = require('./middleware/auth');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/login', (req, res) => res.render('login'));
app.get('/workouts', auth, workoutController.renderWorkoutsPage);

// User routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);

// Workout routes
app.post('/workouts', auth, workoutController.createWorkout);
app.put('/workouts/:id', auth, workoutController.updateWorkout);
app.delete('/workouts/:id', auth, workoutController.deleteWorkout);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
