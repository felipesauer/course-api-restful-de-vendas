import "reflect-metadata";
import { FakeCreateClientRedis } from "../mocks/FakeCreateClientRedis.mock";
import { Redis } from "../../redis/Redis";

let fakeCreateClientRedis: FakeCreateClientRedis;
let redis: Redis;

describe("Redis", () => {
    beforeAll(() => {
        fakeCreateClientRedis = new FakeCreateClientRedis();
        redis = new Redis({
            client: fakeCreateClientRedis.client,
        });
    });

    it("should be able to save value in cache", async () => {
        await redis.save("save", { id: 1 });

        const value = await redis.recover<{ id: string }>("save");

        expect(value).toEqual(
            expect.objectContaining({
                id: 1,
            }),
        );
    });

    it("should be able to recover value in cache", async () => {
        await redis.save("recover", { id: 1 });

        const value = await redis.recover<{ id: string }>("recover");

        expect(value).toEqual(
            expect.objectContaining({
                id: 1,
            }),
        );
    });

    it("should be able to invalidate value in cache", async () => {
        await redis.save("invalidate", { id: 1 });

        await redis.invalidate("invalidate");

        const value = await redis.recover<{ id: string }>("invalidate");

        expect(value).toBe(null);
    });
});
