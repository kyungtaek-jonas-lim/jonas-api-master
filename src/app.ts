import express from 'express';
import { router as baseRouter } from './routes/base';
import { config } from './config/dotenvConfig';
import { connectToMongoDB } from './config/databaseConfig';
import { connectToRedis } from './config/inMemoryConfig';

/**
 * @description App
 * @author Jonas Lim
 */

// ====================================
// Settingss
// ====================================
const app = express(); // Express
app.use(express.json()); // Parse JSON request data to req.body automatically


// ====================================
// Routers
// ====================================
app.use('', baseRouter);


// ====================================
// Listen
// ====================================
app.listen(config.port, () => {
    connectToMongoDB();
    connectToRedis();
    console.log(`Server is running on port ${config.port}`);
});