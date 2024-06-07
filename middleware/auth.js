// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await user.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!person) throw new Error();
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = { isAuthenticated };

