const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Mongoose User model
const User = mongoose.model('User');

// Middleware, ktory kontroluje, ci je pouzivatel prihlaseny alebo nie
module.exports = (req, res, next) => {
  // Ziskanie JWT tokenu z cookies
  const { token } = req.cookies;

  if (!token) return res.status(401).send('Authentification failed');

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) return res.status(401).send('Authentification failed');

    const { userId } = payload;

    const user = await User.findById(userId);
    if (!user) return res.status(401).send('Authentification failed');

    req.user = user;
    next();
  });
};
