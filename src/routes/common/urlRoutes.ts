import express, { Router, Request, Response } from 'express';
import shortid from 'shortid';
import { UrlService } from '../../services/UrlService';
import { redisKeyPrefix, redisClient } from '../../config/inMemoryConfig';
import baseX from 'base-x';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description ShortUrl Route
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

const router: Router = express.Router();
const service = UrlService.getInstance();
const redirectPrefix = "/common/url"

// Define Base62 Character Set (0-9, a-z, A-Z)
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base62 = baseX(BASE62);

// Utility function to store in Redis
const cacheUrl = async (shortId: string, originalUrl: string) => {
    await redisClient.setEx(redisKeyPrefix + shortId, 86400, originalUrl); // Store in cache for 24 hours
};

// Utility function to check Redis first 
const getCachedUrl = async (shortId: string): Promise<string | null> => {
    return await redisClient.get(redisKeyPrefix + shortId);
}

// Utility function to save(create) and cache url
const createAndCacheUrl = async(shortId: string, originalUrl: string) => {
    await service.createUrl({ shortId, originalUrl });
    await cacheUrl(shortId, originalUrl);
}

/**
 * @method 1: Using `shortid`
 * @pros Short, random, and unique
 * @cons Slightly predictable over time
 */
router.post("/shorten/shortid", async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;

        let shortId = shortid.generate();
        createAndCacheUrl(shortId, originalUrl);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}${redirectPrefix}/${shortId}`});
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});


/**
 * @method 2: Base62 Encoding (ID-based)
 * @pros Short and URL-friendly
 * @cons Predictable if sequential IDs are used
 */
router.post("/shorten/base62", async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;
        const count = await service.getAllUrlCounts();
        const shortId = base62.encode(Buffer.from(count.toString()));
        createAndCacheUrl(shortId, originalUrl);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}${redirectPrefix}/${shortId}`});
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});


/**
 * @method 3: SHA-256 Hashing (First 8 chars)
 * @pros Prevents duplicate short URLs for the same original URL
 * @cons Slight chance of hash collisions in short form
 */
router.post("/shorten/sha256", async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;

        // Option 1
        const shortId = crypto.createHash("sha256").update(originalUrl).digest("base64url").substring(0, 8);

        // Opetion 2: Incase the special character, '+', '/', '='
        // const hash = crypto.createHash("sha256").update(originalUrl).digest();
        // const shortId = base62.encode(hash).substring(0, 8);

        createAndCacheUrl(shortId, originalUrl);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}${redirectPrefix}/${shortId}`});
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});


/**
 * @method 4: Sequential ID + Random Suffix
 * @pros Adds uniqueness while preventing predictability
 * @cons URL length increase slightly
 */
router.post("/shorten/sequential", async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;

        const count = await service.getAllUrlCounts();

        // Option 1
        let shortId = base62.encode(Buffer.from(count.toString()));
        shortId += Math.random().toString(36).substring(2, 4);

        // Option 2: Safer in TypeScript
        // const shortId = base62.encode(Uint8Array.from(count.toString(), c => c.charCodeAt(0)));

        createAndCacheUrl(shortId, originalUrl);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}${redirectPrefix}/${shortId}`});
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});

/**
 * @method 5: UUID (Universally Unique Identifier)
 * @pros Highly unique
 * @cons Not URL-friendly due to long length
 */
router.post("/shorten/uuid", async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;

        let shortId = uuidv4().substring(0, 8); // Take first 8 characters
        createAndCacheUrl(shortId, originalUrl);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}${redirectPrefix}/${shortId}`});
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});

/**
 * @description Redirect URL handler (common for all)
 */
router.get("/:shortId", async (req: Request, res: Response) => {
    try {
        const { shortId } = req.params;

        // Check cache first
        const cachedUrl = await getCachedUrl(shortId);
        if (cachedUrl) {
            console.info(`[ShortURL] cachedUrl: ${cachedUrl}`);
            res.redirect(cachedUrl);
            return;
        }

        // Check database if not found in cache
        const url = await service.getUrlByShortId(shortId);
        if (!url) {
            res.status(404).json({ error: "URL not found"});
            return;
        }

        // Increment click count and save the data
        url.clicks++;
        await url.save();

        // Store in cache for future requests (Lazy Loading)
        await cacheUrl(shortId, url.originalUrl);
        console.info(`[ShortURL] Suceeded in caching the url: ${url.originalUrl}`);

        // Redirect
        console.info(`[ShortURL] Redirecting to the original url: ${url.originalUrl}`);
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('[ShortURL] Error ocurred', error);
    }
});

export { router };