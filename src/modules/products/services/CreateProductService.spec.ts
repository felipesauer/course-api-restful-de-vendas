import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import CreateProductService from "./CreateProductService";
import { Redis as Cache } from "@shared/cache/redis/Redis";

let createProductService: CreateProductService;
let fakeProductRepository: FakeProductRepository;

describe("CreateProductService", () => {
    beforeAll(() => {
        jest.spyOn(Cache.prototype, "invalidate").mockImplementation(
            async (key: string) => {
                key;
            },
        );

        fakeProductRepository = new FakeProductRepository();
        createProductService = new CreateProductService(fakeProductRepository);
    });

    it("should be able create product", async () => {
        expect(
            createProductService.execute({
                name: "prod-1",
                price: 1,
                quantity: 1,
            }),
        ).resolves;
    });

    it("should not be able create product when product in already exist", async () => {
        expect(
            createProductService.execute({
                name: "prod-1",
                price: 1,
                quantity: 1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
