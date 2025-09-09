// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, isCaretaker } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password, isCaretaker: isCaretaker || false });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
      isCaretaker: user.isCaretaker,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        isCaretaker: user.isCaretaker,
      });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Link a caretaker to a patient
router.post('/link-caretaker', protect, async (req, res) => {
  const { caretakerEmail } = req.body;
  try {
    const caretaker = await User.findOne({ email: caretakerEmail, isCaretaker: true });
    if (!caretaker) {
      return res.status(404).json({ msg: 'Caretaker not found or is not designated as a caretaker' });
    }
    const patient = await User.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    patient.caretakerId = caretaker._id;
    await patient.save();
    res.json({ msg: `Successfully linked ${caretaker.username} as your caretaker.` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;