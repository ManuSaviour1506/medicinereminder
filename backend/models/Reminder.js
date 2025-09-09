// backend/models/Reminder.js
const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a relationship with the User model
  },
  medicineName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String, // e.g., 'daily', 'every 8 hours', 'before sleep'
    required: true,
  },
  nextDoseTime: {
    type: Date, // The next scheduled time for the reminder
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // We can add other fields like pill count, notes, etc. later
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);