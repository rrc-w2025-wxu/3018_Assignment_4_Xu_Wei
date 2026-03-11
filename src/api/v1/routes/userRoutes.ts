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
    isAuthorized({ hasRole: ["admin", "manager", "officer"] }), 
    Controller.getAllProjects
);

router.post(
    "/projects",
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead"] }),
    createProjectHandler
);

router.put(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead"] }),
    updateProjectHandler
);


router.delete(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    deleteProjectHandler
);

router.get(
    "/projects/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
    getProjectHandler
);

export default router;
