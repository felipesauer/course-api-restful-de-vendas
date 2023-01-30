import { ICache } from "..";
import { ICreateClientRedis } from "./createClientRedis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { inject, injectable } from "tsyringe";

@injectable()
export class Redis implements ICache {
    constructor(
        @inject("createClientRedis")
        private redis: ICreateClientRedis,
    ) {}

    public async save<T>(key: string, value: T): Promise<void> {
        await this.redis.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.redis.client.get(key);

        if (!data) return null;

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.redis.client.del(key);
    }

    public async rateLimiter(key: string): Promise<void> {
        try {
            const limiter = new RateLimiterRedis({
                storeClient: this.redis.client,
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
