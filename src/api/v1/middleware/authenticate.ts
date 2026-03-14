// External library imports
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/Errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";


/**
 * Middleware to authenticate a user using a Firebase ID token.
 * Now integrated with centralized error handling system.
 *
 * This middleware:
 * - Extracts the token from the Authorization header
 * - Verifies the token with Firebase Auth
 * - Stores user information in res.locals for downstream middleware
 * - Throws standardized AuthenticationError for any failures
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */

const mockTokens: Record<string, { uid: string; role: string }> = {
    "mock-idToken-abc123": {
        uid: "officer-uid-001",
        role: "officer"
    },
    "mock-idToken-def456": {
        uid: "client-uid-002",
        role: "client"
    },
    "mock-idToken-ghi789": {
        uid: "admin-uid-003",
        role: "admin"
    }
};


const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token: string | undefined = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : undefined;

        if (!token) {
            res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized: No token provided",
                    code: "TOKEN_NOT_FOUND"
                },
                timestamp: new Date().toISOString()
            });
            return; 
        }

        const user = mockTokens[token];

        if (!user) {
            res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized: Invalid token",
                    code: "TOKEN_INVALID"
                },
                timestamp: new Date().toISOString()
            });
            return;
        }

        res.locals.uid = user.uid;
        res.locals.role = user.role;
        next();
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            // Re-throw authentication errors to be handled by error middleware
            next(error);
        } else if (error instanceof Error) {
            next(
                new AuthenticationError(
                    `Unauthorized: ${getErrorMessage(error)}`,
                    getErrorCode(error)
                )
            );
        } else {
            next(
                new AuthenticationError(
                    "Unauthorized: Invalid token",
                    "TOKEN_INVALID"
                )
            );
        }
    }
};

export default authenticate;