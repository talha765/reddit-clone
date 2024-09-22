const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate and extract user from token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer token
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // Attach decoded token user information to request
    next();
  });
};

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, username, type, phone } = req.body;
  try {
    const newUser = await User.create({ firstName, lastName, email, password, username, type, phone });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
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

// Get User Info Route
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Use user ID from token
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user); // Send user data
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
