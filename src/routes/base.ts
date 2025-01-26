import express, { Router } from 'express';
import { router as v1Router } from './v1/index';

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/v1', v1Router);


// ======================================
// Export
// ======================================
export { router };