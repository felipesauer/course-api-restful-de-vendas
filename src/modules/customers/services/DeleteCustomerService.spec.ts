import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import AppError from "@shared/errors/AppError";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import { ICustomer } from "../domain/models/ICustomer";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let deleteCustomerService: DeleteCustomerService;

describe("DeleteCustomerService", () => {
    beforeAll(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomersRepository,
        );
        deleteCustomerService = new DeleteCustomerService(
            fakeCustomersRepository,
        );
    });

    it("should be able to delete customer", async () => {
        const customer = await createCustomerService.execute({
            name: "Felipe",
            email: "test@test.com",
        });

        expect(deleteCustomerService.execute(customer)).resolves;
    });

    it("should not be able to delete customer what not exist", async () => {
        const fakeCustomer: Omit<ICustomer, "created_at" | "updated_at"> = {
            id: uuidv4(),
            name: "Felipe",
            email: "test@test.com",
        };

        await createCustomerService.execute({
            name: "Felipe",
            email: "test1@test1.com",
        });

        expect(
            deleteCustomerService.execute(fakeCustomer),
        ).rejects.toBeInstanceOf(AppError);
    });
});
