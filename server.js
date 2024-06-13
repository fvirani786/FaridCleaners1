const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');
const { Service, Review, Store, User } = require('./models'); // Import models
const logInfo = require('./middleware/logInfo'); // Import logInfo middleware

dotenv.config();ddfad 

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// View Engine
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    const stores = await Store.find({});
    res.render('index', { services, stores });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Correct /login route to render login.ejs directly
app.get('/login', (req, res) => {
  res.render('login/login'); // Ensure this path matches your views directory structure
});

app.get('/users', logInfo, async (req, res) => { // Apply middleware if needed
  try {
    const users = await User.find({});
    res.render('users/user', { users }); // Ensure this path matches your views directory structure
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.render('services/service', { services }); // Ensure this path matches your views directory structure
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stores', async (req, res) => { // Correct route name
  try {
    const stores = await Store.find({});
    res.render('stores/store', { stores }); // Ensure this path matches your views directory structure
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.render('review/review', { reviews }); // Ensure this path matches your views directory structure
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route for /signup
app.get('/signup', (req, res) => {
  res.render('signup/signup'); // Render your signup page
});

// POST /login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Define a route for handling signup form submission
app.post('/auth/signup', (req, res) => {
  
  res.redirect('/'); 
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});