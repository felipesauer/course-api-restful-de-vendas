import "reflect-metadata";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "@modules/users/domain/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";

let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe("CreateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUserService = new CreateUserService(fakeUsersRepository);
    });

    it("should be able to create a new user", async () => {
        const user = await createUserService.execute({
            name: "Felipe",
            email: "test@test.com",
            password: "123",
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create two users with the same email", async () => {
        await createUserService.execute({
            name: "Felipe",
            email: "test@test.com",
            password: "123",
        });

        expect(
            createUserService.execute({
                name: "Felipe",
                email: "test@test.com",
                password: "123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
