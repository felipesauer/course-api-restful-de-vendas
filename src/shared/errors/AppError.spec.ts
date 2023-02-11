import AppError from "./AppError";

describe("AppError", () => {
    it("should be able to new instance AppError", () => {
        const appError = new AppError("Server Error", 500);

        expect(appError).toEqual(
            expect.objectContaining({
                message: "Server Error",
                statusCode: 500,
            }),
        );
        expect(appError).toBeInstanceOf(AppError);
    });
});
