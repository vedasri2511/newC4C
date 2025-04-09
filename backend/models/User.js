const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Make sure to hash passwords!
});

module.exports = mongoose.model("User", userSchema);
