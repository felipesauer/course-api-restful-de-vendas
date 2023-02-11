import { v4 as uuidv4 } from "uuid";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomer } from "../../models/ICustomer";

class FakeCustomersRepository implements ICustomersRepository {
    public customers: Customer[] = [];

    async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = new Customer();

        customer.id = uuidv4();
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);

        return customer;
    }

    async save(customer: Customer): Promise<Customer> {
        const findIndex = this.customers.findIndex(
            findCustomer => findCustomer.id == customer.id,
        );

        this.customers[findIndex] = customer;
        return customer;
    }

    async remove(customer: ICustomer): Promise<void> {
        this.customers = this.customers.filter(
            value => value.id != customer.id,
        );
    }

    async findAll(): Promise<ICustomer[] | null> {
        return this.customers;
    }

    async findByName(name: string): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.name == name);
        return customer || null;
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.id == id);
        return customer || null;
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = this.customers.find(
            customer => customer.email == email,
        );
        return customer || null;
    }
}

export default FakeCustomersRepository;
