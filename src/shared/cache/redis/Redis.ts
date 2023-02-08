import cache from "@config/cache";
import { Redis as CreateClient } from "ioredis";
import { ICache } from "../models/ICache";

export class Redis implements ICache {
    public client: CreateClient;

    public async normalize(): Promise<this> {
        if (!this.client) this.client = new CreateClient(cache.config.redis);

        return this;
    }

    public async save<T>(key: string, value: T): Promise<void> {
        await (await this.normalize()).client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await (await this.normalize()).client.get(key);

        if (!data) return null;

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await (await this.normalize()).client.del(key);
    }
}
