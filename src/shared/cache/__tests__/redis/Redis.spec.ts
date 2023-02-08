import "reflect-metadata";
import { Redis } from "../../redis/Redis";
import { FakeCreateClientRedis } from "../mocks/FakeCreateClientRedis.mock";
import { Redis as CreateClient } from "ioredis";

let redis: Redis;
let fakeCreateClientRedis: FakeCreateClientRedis;

describe("Redis", () => {
    beforeAll(() => {
        fakeCreateClientRedis = new FakeCreateClientRedis();

        jest.spyOn(CreateClient.prototype, "connect").mockImplementation(
            async () => {
                "connect";
            },
        );

        redis = new Redis();
    });

    it("should be able to normalize connection cache", async () => {
        const normalize = await redis.normalize();

        expect(normalize).toBe(redis);
    });

    it("should be able to save value in cache", async () => {
        redis.client = fakeCreateClientRedis.client;

        await redis.save("save", { id: 1 });

        const value = await redis.recover<{ id: string }>("save");

        expect(value).toEqual(
            expect.objectContaining({
                id: 1,
            }),
        );
    });

    it("should be able to recover value in cache", async () => {
        redis.client = fakeCreateClientRedis.client;

        await redis.save("recover", { id: 1 });

        const value = await redis.recover<{ id: string }>("recover");

        expect(value).toEqual(
            expect.objectContaining({
                id: 1,
            }),
        );
    });

    it("should be able to invalidate value in cache", async () => {
        redis.client = fakeCreateClientRedis.client;

        await redis.save("invalidate", { id: 1 });

        await redis.invalidate("invalidate");

        const value = await redis.recover<{ id: string }>("invalidate");

        expect(value).toBe(null);
    });
});
