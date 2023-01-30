import { container } from "tsyringe";
import { Redis } from "./redis";
import { createClientRedis } from "./redis/createClientRedis";

export interface ICache {
    save<T>(key: string, value: T): Promise<void>;
    recover<T>(key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    rateLimiter(key: string): Promise<void>;
}

export const cache = new Redis(container.resolve(createClientRedis));
