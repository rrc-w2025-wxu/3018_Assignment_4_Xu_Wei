import { Request, Response, NextFunction } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";

describe("isAuthorized middleware (res.status/res.json version)", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockRequest = { params: {} } as Partial<Request>;
    mockResponse = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    nextFunction = jest.fn() as jest.MockedFunction<NextFunction>;
  });

  it("should respond 403 when user has insufficient role", () => {
    mockResponse.locals = { uid: "user123", role: "user" };

    const middleware = isAuthorized({ hasRole: ["admin"] });
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          code: "INSUFFICIENT_ROLE",
          message: expect.stringContaining("Forbidden"),
        }),
        timestamp: expect.any(String),
      })
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should respond 403 when same user not allowed and role insufficient", () => {
    mockRequest.params = { id: "user123" };
    mockResponse.locals = { uid: "user123", role: "user" };

    const middleware = isAuthorized({
      hasRole: ["admin"],
      allowSameUser: false,
    });
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          code: "INSUFFICIENT_ROLE",
          message: expect.stringContaining("Forbidden"),
        }),
        timestamp: expect.any(String),
      })
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });
});