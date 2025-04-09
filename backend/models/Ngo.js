const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ngoSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  website: { type: String },
  description: { type: String, required: true },
  areasOfFocus: [{ type: String }],
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// Hash password before saving
ngoSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Ngo', ngoSchema); 