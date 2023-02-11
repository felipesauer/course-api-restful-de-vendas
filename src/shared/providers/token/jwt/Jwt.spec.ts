import "dotenv/config";
import auth from "@config/auth";
import { Jwt } from "@shared/providers/token/jwt/Jwt";
import { IGenerateToken, IVerifyToken } from "../models/IToken";
import ms from "ms";
import AppError from "@shared/errors/AppError";
import { ITokenPayload } from "@shared/infra/http/express/middlewares/isAuthenticated";

let jwt: Jwt;

describe("Jwt", () => {
    beforeAll(() => {
        jwt = new Jwt();
    });

    it("should be able to generate token", async () => {
        const token = await jwt.generate("api-restful");

        expect(token).toEqual(
            expect.objectContaining<IGenerateToken>({
                token: token.token,
                expiresIn: token.expiresIn,
            }),
        );

        expect(token.expiresIn).toBe(ms(auth.jwt.expiresIn));
    });

    it("should be able to verify token", async () => {
        const token = await jwt.generate("api-restful");

        const verify = await jwt.verify(token.token);

        expect(verify).toEqual(
            expect.objectContaining<IVerifyToken<ITokenPayload>>({
                token: token.token,
                payload: verify.payload as ITokenPayload,
            }),
        );
    });

    it("should be able not to verify token", async () => {
        try {
            await jwt.verify("");
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
        }
    });
});
