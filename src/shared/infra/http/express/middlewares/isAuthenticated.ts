import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("JWT Token is missing.");

    const [, token] = authHeader.split(" ");

    try {
        const decodedToken = verify(token, authConfig.jwt.secret as string);
        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT Token.");
    }
}
