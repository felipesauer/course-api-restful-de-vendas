import "rate-limiter-flexible";
import "dotenv/config";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import CreateSessionsService from "./CreateSessionsService";
import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";

let createSessionsService: CreateSessionsService;
let fakeUsersRepository: FakeUsersRepository;

describe("CreateSessionsService", () => {
    beforeAll(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createSessionsService = new CreateSessionsService(fakeUsersRepository);
    });

    it("should not be able to create a session with email that doesn't exist", async () => {
        expect(
            createSessionsService.execute({
                email: "email@email.com",
                password: "123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a session with incorrect email/password combination.", async () => {
        await fakeUsersRepository.create({
            name: "user",
            email: "email@email.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(
            createSessionsService.execute({
                email: "email@email.com",
                password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a session", async () => {
        const user = await fakeUsersRepository.create({
            name: "user-3",
            email: "email-3@email-3.com",
            password: await new Bcryptjs().generate("1234"),
        });

        const session = await createSessionsService.execute({
            email: "email-3@email-3.com",
            password: "1234",
        });

        expect(session).toEqual(
            expect.objectContaining({
                user,
                token: session.token,
            }),
        );
    });
});
