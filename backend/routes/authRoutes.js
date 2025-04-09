const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Volunteer = require('../models/Volunteer');
const Ngo = require('../models/Ngo');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    console.group('🔐 Login Process');
    console.log('👉 Login attempt:', { email, userType });

    // Validate input
    if (!email || !password || !userType) {
      console.log('❌ Missing fields:', { email: !!email, password: !!password, userType: !!userType });
      return res.status(400).json({ error: 'Email, password, and user type are required' });
    }

    // Select Model
    const Model = userType === 'ngo' ? Ngo : Volunteer;
    console.log('🔍 Searching in model:', userType === 'ngo' ? 'NGO' : 'Volunteer');

    const user = await Model.findOne({ email });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ User found:', { email: user.email });

    // Password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check JWT Secret
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET missing in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Prepare user data to send
    const userData = user.toObject();
    delete userData.password; // Hide password

    console.log('✅ Login successful:', { email: user.email, userType });
    console.groupEnd();

    res.json({
      token,
      user: userData,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
