import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";

let bcryptjs: Bcryptjs;

describe("Bcryptjs", () => {
    beforeAll(() => {
        bcryptjs = new Bcryptjs();
    });

    it("should be able to generate hash", async () => {
        const payload = "api-restful";

        const encrypt = await bcryptjs.generate(payload);

        expect(typeof encrypt).toBe("string");
    });

    it("should be able to comparer hash", async () => {
        const payload = "api-restful";

        const encrypt = await bcryptjs.generate(payload);

        const comparer = await bcryptjs.compare(payload, encrypt);

        expect(comparer).toBe(true);
    });
});
