import mongoose from "mongoose";
import { config } from "./dotenvConfig";

/**
 * @description Database Configuration
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

export async function connectToMongoDB() {
    try {
        await mongoose.connect(config.dbMongoDbUri, {
            maxPoolSize: 10, // Adjust the connection pool size
            serverSelectionTimeoutMS: 5000, // Fail if no server is selected within 5 seconds
            socketTimeoutMS: 45000, // Close connection if no requests are received within 45 seconds
            autoIndex: false, // Disable automatic index creation (optimized for large-scale applications)
        });
        console.log("Connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // exit
    }
}