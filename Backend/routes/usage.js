// routes/usage.js
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const RealUser = require("../models/realUserModel");
const Question = require("../models/questionModel");

router.get("/", requireAuth, async (req, res) => {
  try {
    const realUser = await RealUser.findById(req.realUser._id);
    if (!realUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // determine daily limit 
    let dailyLimit;
    if (realUser.plan === "free") dailyLimit = 5;
    else if (realUser.plan === "standard") dailyLimit = 50;
    else if (realUser.plan === "premium") dailyLimit = Infinity;

    // count how many questions
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const questionCount = await Question.countDocuments({
      user: realUser._id,
      createdAt: { $gte: startOfDay },
    });

    // If plan is Infinity leftover is Infinity else we will subtract
    let questionsLeft =
      dailyLimit === Infinity ? Infinity : dailyLimit - questionCount;

    return res.status(200).json({
      plan: realUser.plan,
      questionsLeft,
    });
  } catch (err) {
    console.error("Error fetching usage:", err);
    res.status(500).json({ error: "Error fetching usage." });
  }
});

module.exports = router;
