import cache from "@config/cache";
import { Redis as createClient } from "ioredis";

export interface ICreateClientRedis {
    client: createClient;
}

export class createClientRedis implements ICreateClientRedis {
    readonly client: createClient;
    constructor() {
        this.client = new createClient(cache.config.redis);
    }
}
