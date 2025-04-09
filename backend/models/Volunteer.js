const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String, required: true },
  residence:{ type: String, required: true },
  username: { type: String, required: true, unique: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("Volunteer", volunteerSchema);
