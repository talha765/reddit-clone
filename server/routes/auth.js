// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, username, type, phone } = req.body;
    console.log("req.body: ",req.body);
  await User.create({ firstName, lastName, email, password, username, type, phone })
  .then(user => res.status(201).json(user))
  .catch(err => res.status(500).json(err));
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(400).json({ error: 'Invalid password' });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, id: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
