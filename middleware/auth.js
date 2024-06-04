// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/Person');

const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const Person = await Person.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!person) throw new Error();
        req.person = person;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = { isAuthenticated };

