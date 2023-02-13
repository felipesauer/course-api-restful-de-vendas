import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import ShowUserService from "./ShowUserService";
import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";

let showUserService: ShowUserService;
let fakeUsersRepository: FakeUsersRepository;

describe("ShowUserService", () => {
    beforeAll(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showUserService = new ShowUserService(fakeUsersRepository);
    });

    it("should not be able show user", async () => {
        expect(
            showUserService.execute({ user_id: uuidv4() }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able show user", async () => {
        const user = await fakeUsersRepository.create({
            name: "user",
            email: "email@email.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(showUserService.execute({ user_id: user.id })).resolves.toEqual(
            expect.objectContaining({
                ...user,
            }),
        );
    });
});
