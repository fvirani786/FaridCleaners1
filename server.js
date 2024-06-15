const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');
const { Service, Review, Store, User } = require('./models'); 
const logInfo = require('./middleware/logInfo'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


require('./config/passport')(passport);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.set('view engine', 'ejs');


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


app.get('/login', (req, res) => {
  res.render('login/login'); 
});

app.get('/users', logInfo, async (req, res) => { 
  try {
    const users = await User.find({});
    res.render('users/user', { users }); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.render('services/service', { services }); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stores', async (req, res) => { 
  try {
    const stores = await Store.find({});
    res.render('stores/store', { stores }); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.render('review/review', { reviews }); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/signup', (req, res) => {
  res.render('signup/signup'); 
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


app.post('/auth/signup', (req, res) => {
  
  User.create({'username': req.body.username,'firstName': req.body.firstName,'lastName': req.body.lastName,'email': req.body.email,'password': req.body.password})
  res.redirect('/'); 
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});