import { NextFunction, Request, Response } from "express";
import { Jwt } from "@shared/providers/token/jwt/Jwt";
import AppError from "@shared/errors/AppError";

export interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Token is missing.");

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = (await new Jwt().verify<ITokenPayload>(token)).payload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid Token.", 401);
    }
}
