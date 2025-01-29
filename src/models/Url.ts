import mongoose, { Schema, Document } from "mongoose";

/**
 * @description MongoDB Test Respository
 * @author Jonas Lim
 * @date Jan 29, 2025
 */
export interface Url extends Document {
    shortId: string;
    originalUrl: string;
    clicks: number;
}
const urlSchema = new Schema({
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
});

export const UrlModel = mongoose.model<Url>("Url", urlSchema);