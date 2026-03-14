import express from "express";
import * as Controller from "../controllers/Controller";
import { itemsHealthCheck } from "../controllers/Controller";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

router.get("/loans", 
    authenticate, 
    isAuthorized({ hasRole: ["officer"] }), 
    Controller.getAllLoansHandler
);

router.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.createLoanHandler
);

router.put(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.updateLoanHandler
);


router.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    Controller.deleteLoanHandler
);

router.get(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager", "officer"] }),
    Controller.getLoanHandler
);

router.post(
    "/auth/signin", Controller.signInHandler
);
export default router;
