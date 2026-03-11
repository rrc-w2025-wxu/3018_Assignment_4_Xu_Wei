import express from "express";
//import { validateRequest } from "../middleware/validate";
//import * as Controller from "../controllers/Controller";
//import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

router.get("/loans", authenticate, )

export default router;
