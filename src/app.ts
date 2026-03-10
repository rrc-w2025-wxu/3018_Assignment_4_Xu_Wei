import express, { Express } from "express";
import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

// Define a route
app.use("/api/v1", router);

export default app;