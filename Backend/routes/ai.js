const express = require('express');
const router = express.Router();
const { askAI, getIntro, getFields } = require('../controllers/aiController');

// POST route to ask AI a question
router.post('/ask', askAI);

// GET route to get field introduction
router.get('/intro/:field', getIntro);

// GET route to get available fields
router.get('/fields', getFields);

module.exports = router;