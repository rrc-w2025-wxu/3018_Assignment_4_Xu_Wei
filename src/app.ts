import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import router from "../src/api/v1/routes/Routes";

const app = express();

app.use(consoleLogger);

app.use(accessLogger);
app.use(errorLogger);

// Body parsing middleware
app.use(express.json());

// API Routes
app.use("/api/v1", router);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;