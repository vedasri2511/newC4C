const express = require("express");
const Volunteer = require("../models/Volunteer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register" });
  }
});

module.exports = router;
