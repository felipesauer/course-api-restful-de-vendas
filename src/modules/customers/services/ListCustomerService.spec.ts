import "reflect-metadata";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import ListCustomersService from "./ListCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let listCustomerService: ListCustomersService;

describe("ListCustomersService", () => {
    beforeAll(() => {
        fakeCustomersRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomersRepository,
        );
        listCustomerService = new ListCustomersService(fakeCustomersRepository);
    });

    it("should be able in list customers", async () => {
        const customer = await createCustomerService.execute({
            name: "user",
            email: "email@email.com",
        });

        const listCustomers = await listCustomerService.execute();

        expect(listCustomers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: customer.id }),
            ]),
        );
    });
});
