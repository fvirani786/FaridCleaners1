const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/person');

// Sign up
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.redirect('/signup');
  }
});

// Log in
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Log out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
