const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Middlewares
const requireAuth = require('../middlewares/requireAuth');

// Mongoose models
const User = mongoose.model('User');

// Router
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    return res
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.JWT_SECRET_EXPIRATION)
        ),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .send();
  } catch (e) {
    const { errors } = e;

    if (errors && errors.email)
      return res.status(422).send('Invalid email provided');
    else if (errors && errors.password)
      return res
        .status(422)
        .send('Password must contains at least 8 characters');
    else if (errors && errors.name)
      return res.status(422).send('Name is too short');

    if (e.message.includes('E11000'))
      return res.status(422).send('Email already exists');
    return res.status(422).send('Invalid data provided');
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send('Email or password was not provided');

  const user = await User.findOne({ email });
  if (!user) return res.status(422).send('Invalid email or password');

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.JWT_SECRET_EXPIRATION)
        ),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .send();
  } catch (error) {
    return res.status(422).send('Invalid email or password');
  }
});

router.post('/signout', requireAuth, async (req, res) => {
  return res.clearCookie('token').send();
});

router.get('/me', requireAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id }).select({
      name: 1,
      email: 1,
      createdAt: 1,
    });
    res.send(user);
  } catch (error) {
    return res.status(422).send('Invalid data provided');
  }
});

module.exports = router;
