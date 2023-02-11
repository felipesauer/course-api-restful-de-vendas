import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import AppError from "@shared/errors/AppError";
import CreateCustomerService from "./CreateCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let updateCustomerService: UpdateCustomerService;

describe("UpdateCustomerService", () => {
    beforeAll(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomersRepository,
        );
        updateCustomerService = new UpdateCustomerService(
            fakeCustomersRepository,
        );
    });

    it("should be able update customer", async () => {
        const customer = await createCustomerService.execute({
            name: "Felipe",
            email: "test@test.com",
        });

        customer.name = "Sauer";
        customer.email = "sauer@test.com";

        expect(updateCustomerService.execute(customer)).resolves.toEqual(
            expect.objectContaining({
                id: customer.id,
                name: customer.name,
                email: customer.email,
            }),
        );
    });

    it("should not be able to update a customer that doesn't exist", async () => {
        const fakeCustomer: Omit<ICustomer, "created_at" | "updated_at"> = {
            id: uuidv4(),
            name: "Felipe",
            email: "test@test.com",
        };

        expect(
            updateCustomerService.execute(fakeCustomer),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to update a customer when changed to an email already belonging to another customer", async () => {
        await createCustomerService.execute({
            name: "Felipe",
            email: "test@test.com",
        });

        const user = await createCustomerService.execute({
            name: "Felipe2",
            email: "test2@test2.com",
        });

        const fakeCustomer: Omit<ICustomer, "created_at" | "updated_at"> = {
            id: user.id,
            name: "Sauer",
            email: "test@test.com",
        };

        expect(
            updateCustomerService.execute(fakeCustomer),
        ).rejects.toBeInstanceOf(AppError);
    });
});
