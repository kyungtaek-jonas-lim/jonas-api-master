import { Url } from "../models/Url";
import { UrlRepository } from "../repositories/UrlRepository";

/**
 * @description MongoDB Url Service
 * @author Jonas Lim
 * @date Jan 29, 2025
 */

export class UrlService {
    private static instance: UrlService;
    private repository: UrlRepository;

    private constructor() {
        this.repository = new UrlRepository();
    }

    public static getInstance(): UrlService {
        if (!UrlService.instance) {
            UrlService.instance = new UrlService();
        }
        return UrlService.instance;
    }

    async createUrl(data: Partial<Url>): Promise<Url> {
        return this.repository.create(data);
    }
    async getAllUrls(): Promise<Url[]> {
        return this.repository.findAll();
    }
    async getUrlById(id: string): Promise<Url | null> {
        return this.repository.findById(id);
    }
    async updateUrl(id: string, updateData: Partial<Url>): Promise<Url | null> {
        return this.repository.updateById(id, updateData);
    }
    async deleteUrl(id: string): Promise<boolean> {
        return this.repository.deleteById(id);
    }
    async getAllUrlCounts(): Promise<number> {
        return this.repository.countAll();
    }
    async getUrlByShortId(shortId: string): Promise<Url | null> {
        return this.repository.findByShortId(shortId);
    }
}