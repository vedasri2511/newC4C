const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new request
router.post('/', async (req, res) => {
  const request = new Request({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    createdBy: req.body.createdBy,
    location: req.body.location,
    urgency: req.body.urgency,
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a request
router.put('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (req.body.title) request.title = req.body.title;
    if (req.body.description) request.description = req.body.description;
    if (req.body.category) request.category = req.body.category;
    if (req.body.status) request.status = req.body.status;
    if (req.body.assignedTo) request.assignedTo = req.body.assignedTo;
    if (req.body.location) request.location = req.body.location;
    if (req.body.urgency) request.urgency = req.body.urgency;

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a request
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    await request.remove();
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 