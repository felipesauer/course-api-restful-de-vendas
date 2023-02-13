import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";
import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";

let showProfileService: ShowProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe("ShowProfileService", () => {
    beforeAll(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it("should not be able show profile", async () => {
        expect(
            showProfileService.execute({ user_id: uuidv4() }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able show profile", async () => {
        const user = await fakeUsersRepository.create({
            name: "user",
            email: "email@email.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(
            showProfileService.execute({ user_id: user.id }),
        ).resolves.toEqual(
            expect.objectContaining({
                ...user,
            }),
        );
    });
});
