import "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "./UpdateProfileService";
import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";

let updateProfileService: UpdateProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe("UpdateProfileService", () => {
    beforeAll(() => {
        fakeUsersRepository = new FakeUsersRepository();
        updateProfileService = new UpdateProfileService(fakeUsersRepository);
    });

    it("should not be able accomplish profile update when user not exist", async () => {
        expect(
            updateProfileService.execute({
                user_id: uuidv4(),
                name: "user",
                email: "email@email.com",
                password: "123",
                old_password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able profile update when the email already exists for another user", async () => {
        await fakeUsersRepository.create({
            name: "user",
            email: "email@email.com",
            password: await new Bcryptjs().generate("123"),
        });

        const user = await fakeUsersRepository.create({
            name: "user-2",
            email: "email-2@email-2.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(
            updateProfileService.execute({
                user_id: user.id,
                name: user.name,
                email: "email@email.com",
                password: user.password,
                old_password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able profile update when password is required", async () => {
        const user = await fakeUsersRepository.create({
            name: "user-3",
            email: "email-3@email-3.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(
            updateProfileService.execute({
                user_id: user.id,
                name: user.name,
                email: user.email,
                password: "12345",
                old_password: "",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able profile update when password is incorrect", async () => {
        const user = await fakeUsersRepository.create({
            name: "user-4",
            email: "email-4@email-4.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(
            updateProfileService.execute({
                user_id: user.id,
                name: user.name,
                email: user.email,
                password: "12345",
                old_password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able profile update", async () => {
        const user = await fakeUsersRepository.create({
            name: "user-5",
            email: "email-5@email-5.com",
            password: await new Bcryptjs().generate("123"),
        });

        const updateUser = await updateProfileService.execute({
            user_id: user.id,
            name: "user-999",
            email: "user-999@user-999.com",
            password: "999",
            old_password: "123",
        });

        expect(updateUser).toEqual(expect.objectContaining({ ...updateUser }));
    });
});
