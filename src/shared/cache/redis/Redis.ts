import { Redis as CreateClient } from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { inject, injectable } from "tsyringe";
import { ICache } from "../models/ICache";

export interface IRedis {
    client: CreateClient;
}

@injectable()
export class Redis implements ICache {
    readonly client: CreateClient;

    constructor(
        @inject("CreateClient")
        redis: IRedis,
    ) {
        this.client = redis.client;
    }

    public async save<T>(key: string, value: T): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) return null;

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async rateLimiter(key: string): Promise<void> {
        try {
            const limiter = new RateLimiterRedis({
                storeClient: this.client,
                keyPrefix: "reatelimit",
                points: 5,
                duration: 1,
            });

            await limiter.consume(key);
        } catch (error) {
            throw new Error("Too many request.");
        }
    }
}
