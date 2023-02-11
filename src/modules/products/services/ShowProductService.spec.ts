import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import ShowProductService from "./ShowProductService";

let showProductService: ShowProductService;
let fakeProductRepository: FakeProductRepository;

describe("ShowProductService", () => {
    beforeAll(() => {
        fakeProductRepository = new FakeProductRepository();
        showProductService = new ShowProductService(fakeProductRepository);
    });

    it("should not be able show product", async () => {
        expect(
            showProductService.execute({ id: uuidv4() }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able show product", async () => {
        const product = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        expect(showProductService.execute({ id: product.id })).resolves.toEqual(
            expect.objectContaining(product),
        );
    });
});
