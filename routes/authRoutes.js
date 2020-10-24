const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Middleware
const requireAuth = require('../middlewares/requireAuth');

// Mongoose User model
const User = mongoose.model('User');

// Router
const router = express.Router();

// Route, ktora sluzi na registraciu pouzivatela a nasledne ulozenie do MongoDB
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vytvorenie noveho pouzivatela
    const newUser = new User({ name, email, password });
    newUser.logs.unshift(new Date().toISOString());
    await newUser.save();

    // Vytvorenie JWT tokena, ktory reprezentuje pouzivatela na zaklade jeho ID
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    // Ulosezenie tokena do HTTP Only cookie, ku ktoprym nie je mozne pomocou JS na klientovi pristupovat
    // Token ulozeny v cookie expiruje presne po 24h
    return res
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.JWT_SECRET_EXPIRATION)
        ),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .send('Registered successfully');
  } catch (e) {
    // Odchytenie errorov a odoslanie na frontend
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

// Route, ktora sluzi na prihlasenie pouzivatela a nasledne zalogovanie tejto aktivity
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send('Email or password was not provided');

  // Najdenie pouzivatela v MongoDB
  const user = await User.findOne({ email });
  if (!user) return res.status(422).send('Invalid email or password');

  try {
    // Porovnanie poskytnuteho hesla a hesla ulozeneho v podobe hash v MongoDB
    await user.comparePassword(password);
    user.logs.unshift(new Date().toISOString());
    await user.save();
    // Vytvorenie JWT tokena, ktory reprezentuje pouzivatela na zaklade jeho ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    // Ulosezenie tokena do HTTP Only cookie, ku ktoprym nie je mozne pomocou JS na klientovi pristupovat
    // Token ulozeny v cookie expiruje presne po 24h
    return res
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.JWT_SECRET_EXPIRATION)
        ),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      })
      .send('Logged in successfully');
  } catch (error) {
    // Odchytenie errorov a odoslanie na frontend
    return res.status(422).send('Invalid email or password');
  }
});

// Route, ktora sluzi na odhlasenie pouzivatela a nasledne zmazanie tokena z cookies
router.post('/signout', requireAuth, async (req, res) => {
  // Zmazanie tokena z cookies
  return res.clearCookie('token').send();
});

// Route, ktora sluzi na ziskanie data o pouzivatelovi ako napr. (meno, email, datum vytvorenia a logy)
router.get('/me', requireAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    // Najdenie pouzivatela v MongoDB
    const user = await User.findOne({ _id }).select({
      name: 1,
      email: 1,
      createdAt: 1,
      logs: 1,
    });
    res.send(user);
  } catch (error) {
    // Odchytenie errorov a odoslanie na frontend
    return res.status(422).send('Invalid data provided');
  }
});

module.exports = router;
