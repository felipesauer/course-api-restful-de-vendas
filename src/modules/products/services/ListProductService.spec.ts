import "rate-limiter-flexible";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import ListProductService from "./ListProductService";

let listProductService: ListProductService;
let fakeProductRepository: FakeProductRepository;

describe("ListProductService", () => {
    beforeAll(() => {
        fakeProductRepository = new FakeProductRepository();
        listProductService = new ListProductService(fakeProductRepository);
    });

    it("should be able list products", async () => {
        const product = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        expect(listProductService.execute()).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: product.id,
                }),
            ]),
        );
    });
});
