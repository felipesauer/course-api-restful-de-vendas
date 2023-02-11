import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/express/middlewares/rateLimiter";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction;

let IPMockRequest: string | number;

describe("rateLimiter", () => {
    beforeEach(() => {
        mockRequest = {
            ip: "127.0.0.1",
        };
        mockResponse = {
            json: jest.fn(),
        };
        nextFunction = jest.fn();

        jest.mock("rate-limiter-flexible")
            .spyOn(RateLimiterMemory.prototype, "consume")
            .mockImplementation(
                async (key: string | number): Promise<RateLimiterRes> => {
                    if (IPMockRequest == key) throw "DDos Detected!";

                    IPMockRequest = key;

                    return new RateLimiterRes();
                },
            );
    });

    it("should be able resolve rateLimiter", async () => {
        await rateLimiter(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        );

        expect(nextFunction).toHaveBeenCalled();
    });

    it("must be able to reject rateLimiter to protect from DDos", async () => {
        expect(
            rateLimiter(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction,
            ),
        ).rejects.toBeInstanceOf(AppError);

        expect(nextFunction).not.toHaveBeenCalled();
    });
});
