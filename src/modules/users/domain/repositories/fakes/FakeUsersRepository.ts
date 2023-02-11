import { v4 as uuidv4 } from "uuid";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import { IUser } from "@modules/users/domain/models/IUser";

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id == user.id,
        );

        this.users[findIndex] = user;
        return user;
    }

    public async findAll(): Promise<IUser[] | null> {
        return this.users;
    }

    public async findByName(name: string): Promise<User | null> {
        const user = this.users.find(user => user.name == name) || null;
        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id == id) || null;
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email == email) || null;
        return user;
    }
}

export default FakeUsersRepository;
