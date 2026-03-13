import express from "express";
import * as Controller from "../controllers/userController";
import { itemsHealthCheck } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

router.get("/projects", 
    authenticate, 
    isAuthorized({ hasRole: ["officer"] }), 
    Controller.getAllProjectsHandler
);

router.post(
    "/projects",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.createProjectHandler
);

router.put(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    Controller.updateProjectHandler
);


router.delete(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    Controller.deleteProjectHandler
);

router.get(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager", "officer"] }),
    Controller.getProjectHandler
);

router.get(
    "/auth/SignIn",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager", "officer"] }),
    Controller.signInHandler
);
export default router;
