import { Callback, Redis as createClient, RedisKey } from "ioredis";

export interface ICreateClientRedis {
    client: createClient;
}

export class FakeCreateClientRedis implements ICreateClientRedis {
    readonly client: createClient;
    private mockCache: {
        [key: string]: string | number | Buffer;
    } = {};

    constructor() {
        this.client = {
            set: this.set.bind(this),
            get: this.get.bind(this),
            del: this.del.bind(this),
        } as createClient;
    }

    public async set(
        key: string,
        value: string | number | Buffer,
        callback?: Callback<"OK">,
    ): Promise<"OK"> {
        this.mockCache[key] = value;
        return "OK";
    }

    public async get(
        key: RedisKey,
        callback?: Callback<string | null> | undefined,
    ): Promise<string | null> {
        const value = this.mockCache[String(key)];
        return value ? String(value) : null;
    }

    public async del(...args: RedisKey[]): Promise<number> {
        args.forEach(k => delete this.mockCache[String(k)]);
        return 1;
    }
}
