import express, { Router, Request, Response } from "express";
import { ItemService } from "../../services/ItemService";
import { Item } from "../../models/Item";

/**
 * @description MongDB CRUD Test API
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

const router: Router = express.Router();
const service = ItemService.getInstance();

router.post("/items", async (req: Request, res: Response) => {
    try {
        const newItem: Item = await service.createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to create item" });
        console.error('[MongoDB] Error ocurred', error);
    }
});

router.get("/items", async (_, res: Response) => {
    try {
        const items: Item[] = await service.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
        console.error('[MongoDB] Error ocurred', error);
    }
});

router.get("/items/:id", async (req: Request, res: Response) => {
    try {
        const item: Item | null = await service.getItemById(req.params.id);
        if (!item) res.status(404).json({ error: "Item not found" });
        else res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item" });
        console.error('[MongoDB] Error ocurred', error);
    }
});

router.put("/items/:id", async (req: Request, res: Response) => {
    try {
        const updatedItem: Item | null = await service.updateItem(req.params.id, req.body);
        if (!updatedItem) res.status(404).json({ error: "Item not found" });
        else res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to update item" });
        console.error('[MongoDB] Error ocurred', error);
    }
});

router.delete("/items/:id", async (req: Request, res: Response) => {
    try {
        const deleted: boolean = await service.deleteItem(req.params.id);
        if (!deleted) res.status(404).json({ error: "Item not found" });
        else res.status(200).json({ message: "Item deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete item" });
        console.error('[MongoDB] Error ocurred', error);
    }
});

export { router };