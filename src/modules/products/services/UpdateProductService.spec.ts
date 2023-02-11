import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import UpdateProductService from "./UpdateProductService";
import { Redis as Cache } from "@shared/cache/redis/Redis";

let updateProductService: UpdateProductService;
let fakeProductRepository: FakeProductRepository;

describe("UpdateProductService", () => {
    beforeAll(() => {
        jest.spyOn(Cache.prototype, "invalidate").mockImplementation(
            async (key: string) => {
                key;
            },
        );

        fakeProductRepository = new FakeProductRepository();
        updateProductService = new UpdateProductService(fakeProductRepository);
    });

    it("should not be able to update on product that does not exist", async () => {
        expect(
            updateProductService.execute({
                id: uuidv4(),
                name: "prod-1",
                price: 1,
                quantity: 1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to update on product to another product that already exist", async () => {
        await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        const product = await fakeProductRepository.create({
            name: "prod-2",
            price: 1,
            quantity: 1,
        });

        expect(
            updateProductService.execute({
                id: product.id,
                name: "prod-1",
                price: 1,
                quantity: 1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update on product", async () => {
        const product = await fakeProductRepository.create({
            name: "prod-3",
            price: 1,
            quantity: 1,
        });

        expect(
            updateProductService.execute({
                id: product.id,
                name: "prod-4",
                price: 2,
                quantity: 2,
            }),
        ).resolves.toEqual(
            expect.objectContaining({
                id: product.id,
                name: "prod-4",
                price: 2,
                quantity: 2,
            }),
        );
    });
});
