import express from "express";
import Routes from "../src/api/v1/routes/Routes";

/**
 * Initialize an Express application
 */
const app = express();

/**
 * Middleware to parse incoming JSON requests
 * This allows the server to handle JSON request bodies
 */
app.use(express.json());

/**
 * Mount API routes
 * All routes defined in Routes will be prefixed with /api/v1
 */
app.use("/api/v1", Routes);

/**
 * Define the port to run the server on
 * Uses the PORT environment variable if available, otherwise defaults to 3000
 */
const PORT = process.env.PORT || 3000;

/**
 * Start the Express server and listen on the defined port
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/**
 * Export the Express app instance for testing or further configuration
 */
export default app;