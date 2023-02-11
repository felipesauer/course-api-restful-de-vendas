import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";

@injectable()
class UpdateCustomerService {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository,
    ) {}

    async execute({ id, name, email }: IUpdateCustomer): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(id);

        if (!customer) throw new AppError("Customer not found.");

        const customerExist = await this.customersRepository.findByEmail(email);
        if (customerExist && customer.email !== email)
            throw new AppError(
                "There is already one customer with this email.",
            );

        customer.name = name;
        customer.email = email;

        await this.customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
