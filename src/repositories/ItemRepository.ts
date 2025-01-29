import { Item, ItemModel } from "../models/Item";

/**
 * @description MongoDB Test Respository
 * @author Jonas Lim
 * @date Jan 29, 2025
 */
export class ItemRepository {

    async create(itemData: Partial<Item>): Promise<Item> {
        const item = new ItemModel(itemData);
        return item.save();
    }

    async findAll(): Promise<Item[]> {
        return ItemModel.find();
    }

    async findById(id: string): Promise<Item | null> {
        return ItemModel.findById(id);
    }

    async updateById(id: string, updateData: Partial<Item>): Promise<Item | null> {
        return ItemModel.findByIdAndUpdate(id, updateData, { new: true }); // { new: true }: return the updated object(data), { new: false }: (default) return the existing object(data)
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await ItemModel.findByIdAndDelete(id);
        return result !== null;
    }
}