import express, { Router } from 'express';
import { router as aiRouter } from './aiRoutes';
import { router as authRouter } from './authRoutes';

/**
 * @description V1 Router
 * @author Jonas Lim
 */

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