require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport-config');
const isLoggedIn = require('./middleware/logInfo');
const { isAuthenticated } = require('./middleware/auth');
const PORT = process.env.PORT || 3000;
const SECRET_SESSION = process.env.SECRET_SESSION;

// Import models
const User = require('./models/Person');

// Initialize app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}));


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.currentUser = req.person;
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define routes
app.get('/', (req, res) => {
    res.render('home', { siteTitle: 'Project2app', user: req.user });
});

app.get('/profile', logInfo, (req, res) => {
    res.render('profile', { name: req.user.name, email: req.user.email, phone: req.user.phone });
});

// Import auth routes
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling for 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🏎️ You are listening on PORT ${PORT}`);
});

module.exports = server;

