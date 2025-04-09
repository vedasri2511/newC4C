const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Ngo = require('../models/Ngo');

// Register a new NGO
router.post('/register', async (req, res) => {
  try {
    const {
      organizationName,
      email,
      password,
      phone,
      address,
      registrationNumber,
      website,
      description,
      areasOfFocus
    } = req.body;

    // Check if NGO already exists
    const existingNgo = await Ngo.findOne({
      $or: [
        { email },
        { registrationNumber }
      ]
    });

    if (existingNgo) {
      return res.status(400).json({
        error: 'An NGO with this email or registration number already exists'
      });
    }

    // Create new NGO
    const newNgo = new Ngo({
      organizationName,
      email,
      password,
      phone,
      address,
      registrationNumber,
      website,
      description,
      areasOfFocus: areasOfFocus || []
    });

    const savedNgo = await newNgo.save();
    
    // Return response without password
    const ngoResponse = savedNgo.toObject();
    delete ngoResponse.password;

    res.status(201).json({
      message: 'NGO registered successfully',
      ngo: ngoResponse
    });
  } catch (error) {
    console.error('Error registering NGO:', error);
    res.status(500).json({ error: 'Server error while registering NGO' });
  }
});

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await Ngo.find().select('-password');
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching NGOs' });
  }
});

// Get a single NGO
router.get('/:id', async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id).select('-password');
    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching NGO' });
  }
});

module.exports = router; 