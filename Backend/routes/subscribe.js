
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const RealUser = require('../models/realUserModel');


router.post('/plan', requireAuth, async (req, res) => {
  const { plan } = req.body; 

  // validating plan
  if (!['free', 'standard', 'premium'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan selected.' });
  }

  try {
    // updating the user's plan
    // requireAuth setting req.realUser = logged in user
    const updatedUser = await RealUser.findByIdAndUpdate(
      req.realUser._id,
      { plan },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ 
      success: true, 
      plan: updatedUser.plan 
    });
  } catch (err) {
    console.error('Error updating plan:', err);
    return res.status(500).json({ error: 'Failed to update plan.' });
  }
});

module.exports = router;
