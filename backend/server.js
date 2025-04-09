// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcryptjs');

const app = express();

// Middlewares
app.use(express.json()); // To parse JSON requests
app.use(cors({
  origin: ['http://localhost:3000'], // Allow both frontend origins
  credentials: true
}));         // To allow cross-origin requests (frontend/backend communication)

// Connect to MongoDB
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start server only after MongoDB connection is established
    const PORT = process.env.PORT || 5000;
    
    // Create server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`CORS enabled for: http://localhost:3000`);
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is in use, trying port ${PORT + 1}`);
        server.close();
        server.listen(PORT + 1);
      } else {
        console.error('Server error:', error);
      }
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit app if connection fails
  });

// Import models and routes
const Volunteer = require('./models/Volunteer');
const requestRoutes = require('./routes/requestRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/requests', requestRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/auth', authRoutes);

// Routes
// POST: Register a Volunteer
app.post("/register/volunteer", async (req, res) => {
  console.log("📥 Incoming Registration:", req.body);

  try {
    const { fullName, email, password, phone, residence, username } = req.body;

    // Basic Validation
    if (!fullName || !email || !password || !phone || !residence || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email or username already exists
    const existingVolunteer = await Volunteer.findOne({ 
      $or: [ { email }, { username } ]
    });

    if (existingVolunteer) {
      return res.status(400).json({ error: "Email or Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new volunteer
    const newVolunteer = new Volunteer({ 
      fullName, 
      email, 
      password: hashedPassword, 
      phone, 
      residence, 
      username 
    });
    const savedVolunteer = await newVolunteer.save();

    console.log("✅ Volunteer Saved:", savedVolunteer);
    res.status(201).json({ message: "Volunteer registered successfully!" });

  } catch (error) {
    console.error("❌ Error Saving Volunteer:", error.message);
    res.status(500).json({ error: "Server Error. Please try again later." });
  }
});

// GET: Health Check Route
app.get("/", (req, res) => {
  res.send("🌟 Backend Server is Running...");
});
