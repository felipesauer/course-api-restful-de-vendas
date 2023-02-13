import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import AppError from "@shared/errors/AppError";
import { IShowCustomer } from "../domain/models/IShowCustomer";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let showCustomerService: ShowCustomerService;

describe("ShowCustomerService", () => {
    beforeAll(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomersRepository,
        );
        showCustomerService = new ShowCustomerService(fakeCustomersRepository);
    });

    it("should be able show customer", async () => {
        const customer = await createCustomerService.execute({
            name: "user",
            email: "email@email.com",
        });

        expect(showCustomerService.execute(customer)).resolves.toEqual(
            expect.objectContaining({ id: customer.id }),
        );
    });

    it("should not be able to show a customer that doesn't exist.", async () => {
        const fakeCustomer: IShowCustomer = {
            id: uuidv4(),
        };

        expect(
            showCustomerService.execute(fakeCustomer),
        ).rejects.toBeInstanceOf(AppError);
    });
});
