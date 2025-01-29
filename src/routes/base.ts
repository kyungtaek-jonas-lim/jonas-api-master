import express, { Router } from 'express';
import { router as commonRouter } from './common/index'
import { router as v1Router } from './v1/index';

/**
 * @description Base Router
 * @author Jonas Lim
 */

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/common', commonRouter);
router.use('/v1', v1Router);


// ======================================
// Export
// ======================================
export { router };