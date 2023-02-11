import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import CreateUserService from "@modules/users/services/CreateUserService";
import ListUserService from "@modules/users/services/ListUserService";
import ShowUserService from "@modules/users/services/ShowUserService";

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUser = container.resolve(ListUserService);

        const users = await listUser.execute();

        return response.json(instanceToInstance(users));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUser = container.resolve(ShowUserService);

        const user = await showUser.execute({ user_id: id });

        return response.json(user);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(instanceToInstance(user));
    }
}
