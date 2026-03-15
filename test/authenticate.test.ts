import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";

describe("authenticate middleware (mockTokens version)", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
        mockRequest = { headers: {} };
        mockResponse = { locals: {}, status: jest.fn().mockReturnThis(), json: jest.fn() };
        nextFunction = jest.fn();
    });

    it("should return 401 if Authorization header is missing", async () => {
        await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                error: expect.objectContaining({
                    message: "Unauthorized: No token provided",
                    code: "TOKEN_NOT_FOUND",
                }),
            })
        );
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", async () => {
        mockRequest.headers = { authorization: "Bearer invalid-token" };

        await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                error: expect.objectContaining({
                    message: "Unauthorized: Invalid token",
                    code: "TOKEN_INVALID",
                }),
            })
        );
        expect(nextFunction).not.toHaveBeenCalled();
    });
});