import cache from "@config/cache";
import { Redis } from "ioredis";
import { container } from "tsyringe";
import { IRedis } from "../Redis";

export class CreateClient {
    readonly client: Redis;
    constructor() {
        this.client = this.client || new Redis(cache.config.redis);
    }
}

container.registerSingleton<IRedis>("CreateClient", CreateClient);
