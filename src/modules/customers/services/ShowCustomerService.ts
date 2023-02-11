import AppError from "@shared/errors/AppError";
import { autoInjectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";
import { IShowCustomer } from "../domain/models/IShowCustomer";

@autoInjectable()
class ShowCustomerService {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository,
    ) {}

    async execute({ id }: IShowCustomer): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(id);

        if (!customer) throw new AppError("Customer not found.");

        return customer;
    }
}

export default ShowCustomerService;
