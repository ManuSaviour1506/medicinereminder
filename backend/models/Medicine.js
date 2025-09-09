// backend/models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true, // e.g., "every 8 hours", "once daily"
  },
  critical: {
    type: Boolean,
    default: false,
  },
  stockCount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Medicine', medicineSchema);