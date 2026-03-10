import { Request, Response } from "express";
//import * as Service from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
//import { ValidationError } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";
//import { Events } from "../models/eventsModel";

/**
 * Check the health status of the service.
 *
 * GET /api/v1/health
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const itemsHealthCheck = (req: Request, res: Response): void => {
    const healthCheck:HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.status(HTTP_STATUS.OK).json(healthCheck);
}

