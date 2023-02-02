import "dotenv/config";
import auth from "@config/auth";
import { Jwt } from "@shared/providers/token/jwt/Jwt";
import { IResponseToken } from "../../../token/models/IToken";
import ms from "ms";

let jwt: Jwt;

describe("Jwt", () => {
    beforeAll(() => {
        jwt = new Jwt();
    });

    it("should be able to generate token", async () => {
        const token = await jwt.generate("api-restful");

        expect(token).toEqual(
            expect.objectContaining<IResponseToken>({
                token: token.token,
                expiresIn: token.expiresIn,
            }),
        );

        expect(token.expiresIn).toBe(ms(auth.jwt.expiresIn));
    });

    it("should be able to verify token", async () => {
        const token = await jwt.generate("api-restful");

        const verify = await jwt.verify(token.token);

        expect(verify).toBe(true);
    });

    it("should be able not to verify token", async () => {
        const verify = await jwt.verify("");

        expect(verify).toBe(false);
    });
});
