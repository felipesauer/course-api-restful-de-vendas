import { Bcryptjs } from "@shared/providers/hash/bcryptjs/Bcryptjs";
import "rate-limiter-flexible";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import ListUserService from "./ListUserService";

let listUserService: ListUserService;
let fakeUsersRepository: FakeUsersRepository;

describe("ListUserService", () => {
    beforeAll(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listUserService = new ListUserService(fakeUsersRepository);
    });

    it("should be able list users", async () => {
        const user = await fakeUsersRepository.create({
            name: "user",
            email: "email@email.com",
            password: await new Bcryptjs().generate("123"),
        });

        expect(listUserService.execute()).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ...user,
                }),
            ]),
        );
    });
});
