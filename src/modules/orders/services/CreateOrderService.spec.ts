import "rate-limiter-flexible";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import FakeOrdersRepository from "../domain/repositories/fakes/FakeOrdersRepository";
import FakeProductRepository from "@modules/products/domain/repositories/fakes/FakeProductRepository";
import CreateOrderService from "./CreateOrderService";
import { v4 as uuidv4 } from "uuid";
import AppError from "@shared/errors/AppError";
import { IProduct } from "@modules/products/domain/models/IProduct";

let createOrderService: CreateOrderService;
let fakeOrderRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeProductRepository: FakeProductRepository;

describe("CreateOrderService", () => {
    beforeAll(() => {
        fakeOrderRepository = new FakeOrdersRepository();
        fakeCustomersRepository = new FakeCustomersRepository();
        fakeProductRepository = new FakeProductRepository();
        createOrderService = new CreateOrderService(
            fakeOrderRepository,
            fakeCustomersRepository,
            fakeProductRepository,
        );
    });

    it("should not be able find customer what not exist", async () => {
        const products = await fakeProductRepository.create({
            name: "prod-1",
            price: 1,
            quantity: 1,
        });

        expect(
            createOrderService.execute({
                customer_id: uuidv4(),
                products: [products],
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able find products what not exist", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-1",
            email: "user-1@user-1.com",
        });

        expect(
            createOrderService.execute({
                customer_id: customer.id,
                products: [{} as IProduct],
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able find a product specific id what not exist", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-2",
            email: "user-2@user-2.com",
        });

        const products = await fakeProductRepository.create({
            name: "prod-2",
            price: 1,
            quantity: 1,
        });

        expect(
            createOrderService.execute({
                customer_id: customer.id,
                products: [
                    products,
                    {
                        id: uuidv4(),
                    } as IProduct,
                ],
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to continue when quantity is smaller than the available", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-3",
            email: "user-3@user-3.com",
        });

        const products = await fakeProductRepository.create({
            name: "prod-3",
            price: 1,
            quantity: 1,
        });

        expect(
            createOrderService.execute({
                customer_id: customer.id,
                products: [
                    {
                        ...products,
                        quantity: 2,
                    },
                ],
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able in create an order", async () => {
        const customer = await fakeCustomersRepository.create({
            name: "user-4",
            email: "user-4@user-4.com",
        });

        const products = await fakeProductRepository.create({
            name: "prod-4",
            price: 1,
            quantity: 1,
        });

        expect(
            createOrderService.execute({
                customer_id: customer.id,
                products: [products],
            }),
        ).resolves;
    });
});
