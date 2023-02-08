import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import isAuthenticated from "@shared/infra/http/express/middlewares/isAuthenticated";
import AppError from "@shared/errors/AppError";
import { Jwt } from "@shared/providers/token/jwt/Jwt";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction;

describe("isAuthenticated", () => {
    beforeEach(() => {
        mockRequest = {
            headers: {
                authorization: "",
            },
        };
        mockResponse = {
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    });

    test("must be able to reject authentication as authentication header is empty", async () => {
        try {
            await isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction,
            );
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
        }
    });

    test("must be able to reject authentication because the authentication header contains an invalid token", async () => {
        try {
            await isAuthenticated(
                {
                    headers: {
                        authorization: "Basic abs",
                    },
                } as Request,
                mockResponse as Response,
                nextFunction,
            );
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
        }
    });

    test("should be able verify token", async () => {
        const resToken = await new Jwt().generate("test");

        await isAuthenticated(
            {
                headers: { authorization: `Basic ${resToken.token}` },
            } as Request,
            mockResponse as Response,
            nextFunction,
        );

        expect(nextFunction).toHaveBeenCalled();
    });
});
