const express = require('express');
const { router: openAIRouter } = require('./ai/openai');
const { router: gpt2Router } = require('./ai/gpt2');

const router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/openai', openAIRouter);
router.use('/gpt2', gpt2Router);


// ======================================
// Export
// ======================================
module.exports = { router };