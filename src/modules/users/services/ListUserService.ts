import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class ListUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(): Promise<IUser[] | null> {
        return await this.usersRepository.findAll();
    }
}

export default ListUserService;
