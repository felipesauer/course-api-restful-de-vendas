import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";
import ListCustomersService from "@modules/customers/services/ListCustomerService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";

class CustomersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listCustomers = container.resolve(ListCustomersService);
        const customers = await listCustomers.execute();
        return response.json(customers);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showCustomer = container.resolve(ShowCustomerService);
        const customer = await showCustomer.execute({ id });
        return response.json(customer);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const createCustomer = container.resolve(CreateCustomerService);
        const customer = await createCustomer.execute({ name, email });
        return response.json(customer);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;
        const updateCustomer = container.resolve(UpdateCustomerService);
        const customer = await updateCustomer.execute({
            id,
            name,
            email,
        });
        return response.json(customer);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteProduct = container.resolve(DeleteCustomerService);
        await deleteProduct.execute({ id });
        return response.json([]);
    }
}

export default CustomersController;
