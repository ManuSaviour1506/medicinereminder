// backend/worker.js
const { Worker } = require('bullmq');
const { sendEmail } = require('./services/notificationService');
const User = require('./models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
  .then(() => console.log('Worker connected to MongoDB'))
  .catch(err => console.error(err));

// Redis connection options
const connection = {
  host: 'localhost',
  port: 6379,
};

// Create a new worker for the 'reminder' queue
const worker = new Worker(
  'reminder',
  async (job) => {
    const { userId, medicineName, dosage } = job.data;
    console.log(`Processing job ${job.id} for user ${userId}`);

    try {
      const user = await User.findById(userId).populate('caretakerId'); // Use populate to get caretaker details
      if (!user) {
        console.error(`User not found for ID: ${userId}`);
        return;
      }

      const message = `Time for your medicine: ${medicineName}, Dosage: ${dosage}`;
      
      // Send notification to the patient
      sendEmail(user.email, 'Medicine Reminder', message);
      console.log(`Email notification sent to patient: ${user.email}`);

      // Send notification to the caretaker if one exists
      if (user.caretakerId) {
        const caretakerMessage = `Reminder: Your patient, ${user.username}, needs to take their medicine: ${medicineName}.`;
        sendEmail(user.caretakerId.email, 'Patient Medicine Reminder', caretakerMessage);
        console.log(`Email notification sent to caretaker: ${user.caretakerId.email}`);
      }

    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
    }
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err.message}`);
});