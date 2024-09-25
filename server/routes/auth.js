const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate and extract user from token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer token
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // Attach decoded token user information to request
    next();
  });
};

// Get User Info Route
router.get('/user', authenticateToken, async (req, res) => {
  try {
    // Use user ID from token (req.user.id is decoded from the JWT)
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'type', 'firstName', 'lastName', 'username'], // Only fetch necessary fields
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user); // Send user data, including type
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, username, type, phone } = req.body;
  try {
    // Ensure you're hashing the password before storing it
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

    // Assuming validPassword is a method in the User model for password validation
    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(400).json({ error: 'Invalid password' });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Include user type in the response
    res.json({ message: 'Login successful', token, id: user.id, type: user.type });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Export router
module.exports = router;
