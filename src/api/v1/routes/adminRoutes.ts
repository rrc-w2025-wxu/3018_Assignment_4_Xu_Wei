import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

// Only admins can set custom claims
router.post(
    "/setCustomClaims",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    setCustomClaims
);

router.get("/projects", 
    authenticate, 
    isAuthorized({ hasRole: ["admin", "lead", "developer"] }), 
    getAllProjectsHandler
);S

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