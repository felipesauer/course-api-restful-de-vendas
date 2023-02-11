import "rate-limiter-flexible";
import { v4 as uuidv4 } from "uuid";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import FakeProductRepository from "@modules/products/domain/repositories/fakes/FakeProductRepository";
import { ICreateOrderProducts } from "../domain/models/ICreateOrderProducts";
import FakeOrdersRepository from "../domain/repositories/fakes/FakeOrdersRepository";
import ShowOrderService from "./ShowOrderService";
import AppError from "@shared/errors/AppError";

let showOrderService: ShowOrderService;
let fakeOrderRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeProductRepository: FakeProductRepository;

describe("ShowOrderService", () => {
    beforeAll(() => {
        fakeOrderRepository = new FakeOrdersRepository();
        fakeCustomersRepository = new FakeCustomersRepository();
        fakeProductRepository = new FakeProductRepository();
        showOrderService = new ShowOrderService(fakeOrderRepository);
    });

    it("should be able show order", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-1",
            email: "user-1@user-1.com",
        });

        const product = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        const order = await fakeOrderRepository.create({
            customer,
            products: [
                {
                    ...({} as ICreateOrderProducts),
                    ...product,
                },
            ],
        });

        expect(showOrderService.execute({ id: order.id })).resolves.toEqual(
            expect.objectContaining({
                customer: customer,
                order_products: [product],
            }),
        );
    });

    it("shouldn't be able to show an order that doesn't exist", async () => {
        expect(
            showOrderService.execute({ id: uuidv4() }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
