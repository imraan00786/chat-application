const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const crypto = require('crypto');

const MAGIC_TOKEN_TTL = 10 * 60 * 1000; // 10 minutes
const MAGIC_LINK_LIMIT = 3; // per hour


router.post('/register', async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    this.email = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    console.log(req.body);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    console.log(req.body);
    const newUser = new User({username,  email, password });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const userObj = await User.findOne({ email: normalizedEmail });

    if (!userObj) {
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    const isMatch = await bcrypt.compare(password, userObj.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
    }

    const token = jwt.sign(
      { id: userObj._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: userObj._id,
        email: userObj.email,
        username: userObj.username,
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/magic-login-request', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const recentRequests = (user.magicTokenRequests || []).filter(t => new Date(t) > oneHourAgo);

    if (recentRequests.length >= MAGIC_LINK_LIMIT) {
      return res.status(429).json({ message: 'Too many magic link requests. Please try again later.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.magicToken = token;
    user.magicTokenExpiry = new Date(now.getTime() + MAGIC_TOKEN_TTL);
    user.magicTokenRequests = [...recentRequests, now];
    await user.save();

    // In production, send this token via email (e.g., with SendGrid or SES)
    res.status(200).json({ message: 'Magic login link sent.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/magic-login', async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.magicToken || !user.magicTokenExpiry) {
      return res.status(401).json({ message: 'Invalid or expired magic login token' });
    }

    const now = new Date();
    if (user.magicToken !== token || now > new Date(user.magicTokenExpiry)) {
      return res.status(401).json({ message: 'Invalid or expired magic login token' });
    }

    // Clear magic login token
    user.magicToken = undefined;
    user.magicTokenExpiry = undefined;
    await user.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: jwtToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
