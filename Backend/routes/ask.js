// routes/ask.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const Question = require('../models/questionModel');
const RealUser = require('../models/realUserModel');

// const { getChatGPTAnswer } = require('../Utils/openaiService');

router.post('/', requireAuth, async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  try {
    // identifying the logged in user
    const realUser = await RealUser.findById(req.realUser._id);

    // determine daily limit 
    let dailyLimit;
    if (realUser.plan === 'free') dailyLimit = 5;
    else if (realUser.plan === 'standard') dailyLimit = 50;
    else if (realUser.plan === 'premium') dailyLimit = Infinity;

    // count how many questions asked 
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const questionCount = await Question.countDocuments({
      user: realUser._id,
      createdAt: { $gte: startOfDay },
    });

    // check if user exceeded 
    if (questionCount >= dailyLimit) {
      return res.status(403).json({
        error: `You have reached your daily question limit (${dailyLimit}).`,
      });
    }

    // calling AI to get answer
    const aiAnswer = "Please use our Gemini-powered AI chat feature instead.";

    // creating new question record
    
    const newQuestion = await Question.create({
      user: realUser._id,
      question,
      answer: aiAnswer,
      model: "gpt-4o-mini",
    });

    // computing how many left 
   
    let questionsLeft;
    if (dailyLimit === Infinity) {
      questionsLeft = Infinity;
    } else {
      
      questionsLeft = dailyLimit - (questionCount + 1);
    }

    // return the newly created question + plan + usage info
    return res.status(200).json({
     
      _id: newQuestion._id,
      question: newQuestion.question,
      answer: newQuestion.answer,
      model: newQuestion.model,
      createdAt: newQuestion.createdAt,

      // additional info for the frontend
      plan: realUser.plan,
      questionsLeft,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error asking question.' });
  }
});

module.exports = router;
