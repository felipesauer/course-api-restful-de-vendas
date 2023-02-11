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
            name: "Felipe",
            email: "test@test.com",
            password: "123",
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
