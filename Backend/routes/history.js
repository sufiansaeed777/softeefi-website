const express = require("express");
const router = express.Router(); 
const requireAuth = require("../middleware/requireAuth");
const Question = require("../models/questionModel");


router.get("/", requireAuth, async (req, res) => {
  try {
    
    const history = await Question.find({ user: req.realUser._id }).sort({
      createdAt: -1, 
    });
    res.json(history); //sending history as JSON
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Error fetching history." });
  }
});

module.exports = router; 