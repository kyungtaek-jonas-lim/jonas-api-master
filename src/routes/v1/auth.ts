
import express, { Router } from 'express';
import { router as oidcGoogleRouter } from './oidc/oidc_google';

const router: Router = express.Router();

// ======================================
// Settings
// ======================================
router.use('/oidc/google', oidcGoogleRouter);


// ======================================
// Export
// ======================================
export { router };