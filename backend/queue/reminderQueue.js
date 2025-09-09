// backend/queue/reminderQueue.js
const { Queue } = require('bullmq');

// Redis connection options
const connection = {
  host: 'localhost', // Or your Redis host if it's a separate server
  port: 6379,
};

// Create a new queue named 'reminder'
const reminderQueue = new Queue('reminder', { connection });

// Function to add a reminder job to the queue
const addReminderJob = async (reminder) => {
  const delay = new Date(reminder.nextDoseTime).getTime() - Date.now();
  if (delay > 0) {
    await reminderQueue.add(
      'sendNotification', // Job name
      {
        userId: reminder.userId,
        medicineName: reminder.medicineName,
        dosage: reminder.dosage,
      },
      {
        delay, // Delay in milliseconds
        jobId: reminder._id.toString(), // Use reminder ID as a unique job ID
      }
    );
    console.log(`Added job for ${reminder.medicineName} with a delay of ${delay / 1000} seconds.`);
  }
};

module.exports = { addReminderJob };