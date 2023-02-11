import "rate-limiter-flexible";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import FakeProductRepository from "@modules/products/domain/repositories/fakes/FakeProductRepository";
import { ICreateOrderProducts } from "../domain/models/ICreateOrderProducts";
import FakeOrdersRepository from "../domain/repositories/fakes/FakeOrdersRepository";
import ListOrderService from "./ListOrderService";

let listOrderService: ListOrderService;
let fakeOrderRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeProductRepository: FakeProductRepository;

describe("ListOrderService", () => {
    beforeAll(() => {
        fakeOrderRepository = new FakeOrdersRepository();
        fakeCustomersRepository = new FakeCustomersRepository();
        fakeProductRepository = new FakeProductRepository();
        listOrderService = new ListOrderService(fakeOrderRepository);
    });

    it("should be able list orders", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-1",
            email: "user-1@user-1.com",
        });

        const product = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        await fakeOrderRepository.create({
            customer,
            products: [
                {
                    ...({} as ICreateOrderProducts),
                    ...product,
                },
            ],
        });

        expect(listOrderService.execute()).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    customer: customer,
                    order_products: [product],
                }),
            ]),
        );
    });
});
