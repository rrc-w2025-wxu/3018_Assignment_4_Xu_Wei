import { Request, Response } from "express";
import * as itemService from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
//import { ValidationError } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { AuthenticationError } from "../errors/Errors";
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

export const getAllProjectsHandler = (req: Request, res: Response) => {
    try{
        const items = itemService.getAllProjects();
        const count: number = items.length;
        res.status(HTTP_STATUS.OK).json({ message: "Loan applications retrieved", count, data: items });
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: `Failed to create project: ${error.message}` });
    }
    return res.status(500).json({ message: "Failed to create project: Unknown error" });
  }
};
    


export const createProjectHandler = (req:Request, res:Response):void => {
    const applicant = req.body.applicant;
    const amount = req.body.amount;
    const status = req.body.status;

    const items =  itemService.createProject(applicant, amount, status);
    res.status(HTTP_STATUS.OK).json({ message:""});

}

