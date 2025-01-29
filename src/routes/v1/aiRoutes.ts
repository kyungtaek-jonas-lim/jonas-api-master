
import express, { Router } from 'express';
import { router as openAIRouter } from './ai/openaiRoutes';
import { router as gpt2Router } from './ai/gpt2Routes';

/**
 * @description AI Router
 * @author Jonas Lim
 */

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