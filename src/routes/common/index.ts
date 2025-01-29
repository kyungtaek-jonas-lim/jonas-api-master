import express, { Router } from 'express';
import { router as dbRouter } from './mongodbRoutes';
import { router as urlRouter } from './urlRoutes';

/**
 * @description Common Router
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/mongodb', dbRouter);
router.use('/url', urlRouter);


// ======================================
// Export
// ======================================
export { router };