import express, { Router } from 'express';
import { router as aiRouter } from './ai';

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/ai', aiRouter);


// ======================================
// Export
// ======================================
export { router };