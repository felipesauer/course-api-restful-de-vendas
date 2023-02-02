import { IResponseToken, IToken } from "../models/IToken";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import ms from "ms";

export class Jwt implements IToken {
    public async generate(payload: string): Promise<IResponseToken> {
        const token = sign({ payload }, auth.jwt.secret as string, {
            expiresIn: ms(auth.jwt.expiresIn),
        });

        return {
            token,
            expiresIn: ms(auth.jwt.expiresIn),
        };
    }

    public async verify(token: string): Promise<boolean> {
        try {
            verify(token, auth.jwt.secret as string);
            return true;
        } catch (error) {
            return false;
        }
    }
}
