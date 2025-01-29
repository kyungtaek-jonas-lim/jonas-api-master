import express, { Router } from 'express';
import { router as dbRouter } from './mongodbRoutes';

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


// ======================================
// Export
// ======================================
export { router };