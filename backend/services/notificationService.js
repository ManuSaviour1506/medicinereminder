// backend/services/notificationService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Nodemailer setup for Gmail
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Use an App Password for security
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };
  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };