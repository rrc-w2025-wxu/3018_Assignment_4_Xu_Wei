import express from "express";
import * as Controller from "../controllers/Controller";
import { itemsHealthCheck } from "../controllers/Controller";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

/**
 * Health Check
 * GET /api/v1/health
 * Public endpoint to check if the service is running.
 */
router.get("/health", itemsHealthCheck);

/**
 * Get all loan applications
 * GET /api/v1/loans
 * - Requires authentication
 * - Only accessible by users with the "officer" role
 */
router.get("/loans", 
    authenticate, 
    isAuthorized({ hasRole: ["officer"] }), 
    Controller.getAllLoansHandler
);

/**
 * Create a new loan application
 * POST /api/v1/loans
 * - Requires authentication
 * - Only accessible by users with the "manager" role
 */
router.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.createLoanHandler
);

/**
 * Update an existing loan application
 * PUT /api/v1/loans/:id
 * - Requires authentication
 * - Only accessible by users with the "manager" role
 */
router.put(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.updateLoanHandler
);

/**
 * Delete a loan application
 * DELETE /api/v1/loans/:id
 * - Requires authentication
 * - Only accessible by users with the "admin" role
 */
router.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    Controller.deleteLoanHandler
);

/**
 * Get a single loan application by ID
 * GET /api/v1/loans/:id
 * - Requires authentication
 * - Accessible by "admin", "manager", or "officer" roles
 */
router.get(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager", "officer"] }),
    Controller.getLoanHandler
);

/**
 * Sign in endpoint
 * POST /api/v1/auth/signin
 * - Public endpoint to authenticate a user and receive a token
 */
router.post(
    "/auth/signin", Controller.signInHandler
);
export default router;
