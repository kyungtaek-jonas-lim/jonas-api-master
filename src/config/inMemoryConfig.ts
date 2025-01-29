import { config } from "./dotenvConfig";
import { createClient } from "redis";

/**
 * @description In-Memory Configuration
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

// Redis Prefix
const redisKeyPrefix = "jonas-api-master:url:";

const redisClient = createClient({
    socket: {
        host: config.inMemoryRedisHost as string,
        port: config.inMemoryRedisPort,
    }
});

export async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log("Connected to Redis!");
    } catch (error) {
        console.error("Redis connection error:", error);
        process.exit(1); // exit
    }
};

export { redisKeyPrefix, redisClient };