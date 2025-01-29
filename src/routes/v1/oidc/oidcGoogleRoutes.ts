import express, { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/dotenvConfig';

/**
 * @description OIDC Router
 * @author Jonas Lim
 */

const router = express.Router();

/**
 * Step 1: Redirect to Google for user authentication
 */

router.get('', async (req: Request, res: Response): Promise<void> => {

    // Request data (Query String)
    const { scope } = req.query;
    if (!scope || typeof scope !== 'string') {
        res.status(400).send("Bad Request: 'scope' is required - e.g. openid email profile")
        return;
    }

    const queryParams = new URLSearchParams({
        client_id: config.googleClientId,
        redirect_uri: config.googleOidcRedirectUri,
        response_type: 'code',
        scope: scope,
        access_type: 'offline', // 'offline': get Refresh Token too, 'online': only Access Token

    }).toString();
    console.info(`[OIDC - Google] Redirect - scope: ${scope}, url: ${config.googleAuthUrl}?${queryParams}`);
    res.redirect(`${config.googleAuthUrl}?${queryParams}`);
});



/**
 * Step 2: Handle the callback from Google and exchange code for tokens
 */
router.get('/redirect', async (req: Request, res: Response): Promise<void> => {
    const { code } = req.query;

    if (!code) {
        console.error(`[OIDC - Google] Invalid code`);
        res.status(400).send('Authorization code not provided');
        return;
    }

    try {
        /**
         * Step 3: Exchange authorization code for tokens
         */
        const tokenResponse = await axios.post(
            config.googleTokenUrl,
            new URLSearchParams({
                code: code as string,
                client_id: config.googleClientId,
                client_secret: config.googleClientSecret,
                redirect_uri: config.googleOidcRedirectUri,
                grant_type: 'authorization_code',
            }).toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { id_token, access_token } = tokenResponse.data;
        console.info(`[OIDC - Google] Code: ${code}`);
        console.info(`[OIDC - Google] Token data requested with code: ${JSON.stringify(tokenResponse.data)}`);

        /**
         * Step 4: Decode and validate ID token
         */
        const decodedToken = jwt.decode(id_token, { complete: true });
        if (!decodedToken) {
            res.status(400).send('Invalid ID token');
            return;
        }
        console.info(`[OIDC - Google] ID Token: ${JSON.stringify(decodedToken)}`);

        /**
         * Step 5: (Not neccessary) Verify token signature using a library or Google's public key (advanced)
         */
        const userInfoResponse = await axios.get(config.googleUserinfoUrl, {
            headers: { Authorization: `Bearer ${access_token}`}
        });

        const userInfo = userInfoResponse.data;
        console.info(`[OIDC - Google] Additional userInfo requested with access token: ${JSON.stringify(userInfo)}`);
        
        // Process user Info (store in database, create session, etc.)
        res.json({ message: 'Authentication successful', user: userInfo });

    } catch (error) {
        console.error('Error during token exchange', error);
        res.status(500).send('Authentication failed');
    }
});



/**
 * Step 6: Logout route
 */
router.get('/logout', (req: Request, res: Response) => {
    // TODO: Logout logic
    res.send('Logged out');
});


// ======================================
// Export
// ======================================
export { router };