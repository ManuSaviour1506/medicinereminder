// backend/routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { protect } = require('../middleware/authMiddleware');
const { addReminderJob } = require('../queue/reminderQueue');

// Create a new reminder
router.post('/', protect, async (req, res) => {
  const { medicineName, dosage, frequency, nextDoseTime } = req.body;
  try {
    const reminder = new Reminder({
      userId: req.user._id,
      medicineName,
      dosage,
      frequency,
      nextDoseTime: new Date(nextDoseTime),
    });
    await reminder.save();
    await addReminderJob(reminder);
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reminders for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ nextDoseTime: 1 });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a reminder
router.delete('/:id', protect, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    if (reminder.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this reminder' });
    }
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reminder removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;