import { inject, injectable } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
class ListCustomersService {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository,
    ) {}

    async execute(): Promise<ICustomer[] | null> {
        const customers = this.customersRepository.findAll();
        return customers;
    }
}

export default ListCustomersService;
