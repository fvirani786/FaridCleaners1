const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reviews: [{type: mongoose.Schema.Types.ObjectId,ref:'Review' }]


}, { timestamps: true });

userSchema.pre('save', function(next) {
    console.log('------- PASSWORD -------', this.password); // might delete later...
    let hash = bcrypt.hashSync(this.password, 12);
    console.log('------- HASH -------', hash); // might delete later...
    this.password = hash;
    next();
});

// create the model and export it
const user = mongoose.model('User', userSchema);

// make this model avaliable for the index file
module.exports = user;