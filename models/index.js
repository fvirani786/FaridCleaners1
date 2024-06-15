const mongoose = require('mongoose');
require('dotenv').config();
console.log('--PRINT--', process.env.MONGO_URI);

const User = require('./user');
const Review = require('./Review');
const Service = require('./Service');
const Store = require('./store');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}:${db.port}`));
db.on('error', (error) => console.log('Database error \n', error));

module.exports = {
  
    User, Review, Service, Store 
};