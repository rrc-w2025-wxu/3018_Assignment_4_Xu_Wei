import express, { Express } from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

app.use(consoleLogger);

app.use(accessLogger);

// Body parsing middleware
app.use(express.json());

// Define a route
app.use("/api/v1", router);

app.use(errorLogger);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;