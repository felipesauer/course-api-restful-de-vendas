import { Typeorm } from "@shared/infra/database/typeorm/Typeorm";
import { DataSource } from "@shared/infra/database/typeorm/DataSource";

let typeorm: Typeorm;

describe("Typeorm", () => {
    beforeAll(() => {
        jest.spyOn(DataSource, "initialize").mockImplementation(
            async () => DataSource,
        );

        jest.spyOn(console, "log").mockImplementation(() => true);

        typeorm = new Typeorm();
    });

    it("should be able initialize database", async () => {
        expect(typeorm.initialize()).resolves.toBeUndefined;
    });

    it("should be able not initialize database", async () => {
        jest.spyOn(DataSource, "initialize").mockImplementation(async () => {
            throw false;
        });

        expect(typeorm.initialize()).rejects.toBeUndefined;
    });
});
