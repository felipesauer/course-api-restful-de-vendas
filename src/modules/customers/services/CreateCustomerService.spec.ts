import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe("CreateCustomer", () => {
    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomersRepository,
        );
    });

    it("should be able to create a new customer", async () => {
        const customer = await createCustomerService.execute({
            name: "user",
            email: "email@email.com",
        });

        expect(customer).toHaveProperty("id");
    });

    it("should not be able to create two customers with the same email", async () => {
        await createCustomerService.execute({
            name: "user",
            email: "email@email.com",
        });

        expect(
            createCustomerService.execute({
                name: "user",
                email: "email@email.com",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
