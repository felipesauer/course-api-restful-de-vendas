import { IGenerateToken, IVerifyToken, IToken } from "../models/IToken";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import ms from "ms";
import AppError from "@shared/errors/AppError";

export class Jwt implements IToken {
    public async generate(payload: string): Promise<IGenerateToken> {
        const token = sign({}, auth.jwt.secret as string, {
            subject: payload,
            expiresIn: ms(auth.jwt.expiresIn),
        });

        return {
            token,
            expiresIn: ms(auth.jwt.expiresIn),
        };
    }

    public async verify<T>(token: string): Promise<IVerifyToken<T>> {
        try {
            const payload = verify(token, auth.jwt.secret as string);

            return {
                token,
                payload: payload as T,
            };
        } catch (error) {
            throw new AppError(String(error));
        }
    }
}
