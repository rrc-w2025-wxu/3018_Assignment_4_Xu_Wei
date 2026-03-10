import express from "express";
import { validateRequest } from "../middleware/validate";
import * as Controller from "../controllers/Controller";
import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/Controller";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

// Create event - validates body only
router.post("/events", 
    validateRequest(Schemas.create), 
    Controller.createController
);

// Get all events
router.get("/events", Controller.allEventsController);

// Get a single event - validates body and params
router.get(
    "/events/:id",
    validateRequest(Schemas.getById),
    Controller.singleEventController
);

// Update a single event - validates body and params
router.put("/events/:id", 
    validateRequest(Schemas.update), 
    Controller.updateEventController
);

// Delete a single event - validates body and params
router.delete("/events/:id", 
    validateRequest(Schemas.delete),
    Controller.deleteEventController
);

export default router;
