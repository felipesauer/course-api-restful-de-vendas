import { Repository } from "typeorm";
import { DataSource } from "@shared/infra/database/typeorm/DataSource";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from "../entities/Customer";

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = DataSource.getRepository(Customer);
    }

    async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({ name, email });
        return this.ormRepository.save(customer);
    }

    async save(customer: Customer): Promise<Customer> {
        return await this.ormRepository.save(customer);
    }

    async remove(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }

    async findAll(): Promise<Customer[] | null> {
        return await this.ormRepository.find();
    }

    async findByName(name: string): Promise<Customer | null> {
        return await this.ormRepository.findOne({
            where: {
                name,
            },
        });
    }

    async findById(id: string): Promise<Customer | null> {
        return await this.ormRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findByEmail(email: string): Promise<Customer | null> {
        return await this.ormRepository.findOne({
            where: {
                email,
            },
        });
    }
}

export default CustomersRepository;
