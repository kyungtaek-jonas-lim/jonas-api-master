import express, { Router } from 'express';
import { router as aiRouter } from './ai';
import { router as authRouter } from './auth';

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/ai', aiRouter);
router.use('/auth', authRouter);


// ======================================
// Export
// ======================================
export { router };