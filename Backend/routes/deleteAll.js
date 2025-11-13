const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Question = require("../models/questionModel");


router.delete("/", requireAuth, async (req, res) => {
  try {
    const result = await Question.deleteMany({ user: req.realUser._id });
    res.status(200).json({ success: true, message: "All questions deleted." });
  } catch (err) {
    console.error("Error deleting all questions:", err);
    res.status(500).json({ error: "Error deleting all questions." });
  }
});


module.exports = router;
