import { Request, Response, NextFunction } from "express";
import { cache } from "@shared/cache";
import AppError from "@shared/errors/AppError";

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await cache.rateLimiter(request.ip);
        return next();
    } catch (error) {
        throw new AppError(error as string, 409);
    }
}
