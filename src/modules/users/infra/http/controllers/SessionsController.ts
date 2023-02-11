import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import CreateSessionsService from "@modules/users/services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSession = container.resolve(CreateSessionsService);

        const user = await createSession.execute({
            email,
            password,
        });

        return response.json(instanceToInstance(user));
    }
}
