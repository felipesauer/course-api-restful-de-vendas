import "rate-limiter-flexible";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import { Redis as Cache } from "@shared/cache/redis/Redis";
import DeleteProductService from "./DeleteProductService";
import { v4 as uuidv4 } from "uuid";
import AppError from "@shared/errors/AppError";

let deleteProductService: DeleteProductService;
let fakeProductRepository: FakeProductRepository;

describe("DeleteProductService", () => {
    beforeAll(() => {
        jest.spyOn(Cache.prototype, "invalidate").mockImplementation(
            async (key: string) => {
                key;
            },
        );

        fakeProductRepository = new FakeProductRepository();
        deleteProductService = new DeleteProductService(fakeProductRepository);
    });

    it("should not be able delete product what don't exist", async () => {
        expect(
            deleteProductService.execute({
                id: uuidv4(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able delete product", async () => {
        const product = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        expect(
            deleteProductService.execute({
                id: product.id,
            }),
        ).resolves;
    });
});
