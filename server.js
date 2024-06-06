const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');
const SECRET_SESSION = process.env.SECRET_SESSION;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// // MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// // Session
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
// app.get('/fruits', (req, res) => {
//     // send index.ejs with array of fruits
//     res.render('fruits/index', { allFruits: fruits });
// });
// Routes
app.get('/', (req, res) => {
    
    res.render('index'); // Render the index.ejs template
  });
  
  app.get('/users', (req, res) => {
    
    res.render('users/index'); // Render the users/index.ejs template
  });
  
  app.get('/services', (req, res) => {
    
    res.render('services/index'); // Render the services/index.ejs template
  });
  
  app.get('/stores', (req, res) => {
    
    res.render('stores/index'); // Render the stores/index.ejs template
  });
  
  app.get('/reviews', (req, res) => {
   
    res.render('reviews/index'); // Render the reviews/index.ejs template
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
