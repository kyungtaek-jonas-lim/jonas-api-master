import { Url, UrlModel } from "../models/Url";

/**
 * @description MongoDB Url Respository
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

export class UrlRepository {
    async create(data: Partial<Url>): Promise<Url> {
        const model = new UrlModel(data);
        return model.save();
    }
    async findAll(): Promise<Url[]> {
        return UrlModel.find();
    }
    async findById(id: string): Promise<Url | null> {
        return UrlModel.findById(id);
    }
    async updateById(id: string, updateData: Partial<Url>): Promise<Url | null> {
        return UrlModel.findByIdAndUpdate(id, updateData, { new: true}); // { new: true }: return the updated object(data), { new: false }: (default) return the existing object(data)
    }
    async deleteById(id: string): Promise<boolean> {
        return (await UrlModel.findByIdAndDelete(id)) !== null;
    }
    async countAll(): Promise<number> {
        return await UrlModel.countDocuments();
    }
    async findByShortId(shortId: string): Promise<Url | null> {
        return await UrlModel.findOne({ shortId });
    }
}