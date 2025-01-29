import { Item } from "../models/Item";
import { ItemRepository } from "../repositories/ItemRepository";

/**
 * @description MongoDB Test Service
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

export class ItemService {
    private static instance: ItemService;
    private repository: ItemRepository;

    private constructor() {
        this.repository = new ItemRepository();
    }

    public static getInstance(): ItemService {
        if (!ItemService.instance) {
            ItemService.instance = new ItemService();
        }
        return ItemService.instance;
    }

    async createItem(itemData: Partial<Item>): Promise<Item> {
        return this.repository.create(itemData);
    }

    async getAllItems(): Promise<Item[]> {
        return this.repository.findAll();
    }

    async getItemById(id: string): Promise<Item | null> {
        return this.repository.findById(id);
    }

    async updateItem(id: string, updateData: Partial<Item>): Promise<Item | null> {
        return this.repository.updateById(id, updateData);
    }

    async deleteItem(id: string): Promise<boolean> {
        return this.repository.deleteById(id);
    }
}