import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";
import { Jwt } from "@shared/providers/token/jwt/Jwt";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class CreateSessionsService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        email,
        password,
    }: ICreateSession): Promise<IUserAuthenticated> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordConfirmed = await new Bcryptjs().compare(
            password,
            user.password,
        );

        if (!passwordConfirmed) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const resToken = await new Jwt().generate(user.id);

        return {
            user,
            token: resToken.token,
        };
    }
}

export default CreateSessionsService;
