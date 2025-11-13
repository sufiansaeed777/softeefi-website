
const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../Utils/emailService');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // validating
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill out all fields.' });
  }

  try {
    // sending an email notification
    await sendContactEmail({ name, email, message });
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
