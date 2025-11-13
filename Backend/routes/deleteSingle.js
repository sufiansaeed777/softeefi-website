
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Question = require("../models/questionModel");

// deleting single question
router.delete("/:questionId", requireAuth, async (req, res) => {
  try {
    const { questionId } = req.params;
    //confirming Q belongs to logged in user
    const deleted = await Question.findOneAndDelete({
      _id: questionId,
      user: req.realUser._id,
    });
    if (!deleted) {
      return res.status(404).json({ error: "Question not found or not yours." });
    }
    res.status(200).json({ success: true, message: "Question deleted." });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Error deleting question." });
  }
});

module.exports = router;
