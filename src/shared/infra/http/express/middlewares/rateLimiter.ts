import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";
import { RateLimiterMemory } from "rate-limiter-flexible";

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await new RateLimiterMemory({
            points: 6,
            duration: 1,
        }).consume(request.ip);

        return next();
    } catch (error) {
        throw new AppError(error as string, 409);
    }
}
