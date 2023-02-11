import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import internalError from "./internalError";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction;

describe("internalError", () => {
    beforeAll(() => {
        mockRequest = {
            headers: {
                authorization: "",
            },
        };
        mockResponse = {
            json: jest.fn().mockImplementation((body?: any) => body),
            status: jest.fn().mockImplementation((code: number) => {
                mockResponse.statusCode = code;
                return mockResponse;
            }),
        };
        nextFunction = jest.fn();
    });

    it("should be able reject request when triggered an error with the instance of AppError", () => {
        try {
            throw new AppError("Error request", 403);
        } catch (error) {
            const resJson = internalError(
                error as Error,
                mockRequest as Request,
                mockResponse as Response,
                nextFunction,
            );

            expect(resJson).toEqual(
                expect.objectContaining({
                    status: "error",
                    message: "Error request",
                }),
            );
            expect(mockResponse.statusCode).toBe(403);
        }
    });

    it("should be able reject request when triggered an error internal by system", () => {
        try {
            throw new Error("Internal server error");
        } catch (error) {
            const resJson = internalError(
                error as Error,
                mockRequest as Request,
                mockResponse as Response,
                nextFunction,
            );

            expect(resJson).toEqual(
                expect.objectContaining({
                    status: "error",
                    message: "Internal server error",
                }),
            );
            expect(mockResponse.statusCode).toBe(500);
        }
    });
});
