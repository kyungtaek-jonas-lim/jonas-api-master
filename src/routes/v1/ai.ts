
import express, { Router } from 'express';
import { router as openAIRouter } from '../../services/ai/openai';
import { router as gpt2Router } from '../../services/ai/gpt2';

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/openai', openAIRouter);
router.use('/gpt2', gpt2Router);


// ======================================
// Export
// ======================================
export { router };