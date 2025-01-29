
import express, { Router } from 'express';
import { router as oidcGoogleRouter } from './oidc/oidcGoogleRoutes';

/**
 * @description Auth Router
 * @author Jonas Lim
 */

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/oidc/google', oidcGoogleRouter);


// ======================================
// Export
// ======================================
export { router };