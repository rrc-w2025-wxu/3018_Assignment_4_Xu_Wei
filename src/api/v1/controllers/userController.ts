import { Request, Response } from "express";
import * as itemService from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
//import { ValidationError } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { auth } from "../../../config/firebaseConfig";
import { Users } from "../../../userData";
import { LoanStatus } from "../../../interface_properties";
//import { AuthenticationError } from "../errors/Errors";
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

export const getAllLoansHandler = (req: Request, res: Response) => {
    try{
        const items = itemService.getAllLoans();
        const count: number = items.length;
        res.status(HTTP_STATUS.OK).json({ message: "Loan applications retrieved", count, data: items });
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: `Failed to create project: ${error.message}` });
    }
    return res.status(500).json({ message: "Failed to create project: Unknown error" });
  }
};
    
export const createLoanHandler = (req:Request, res:Response) => {
    try{
        const applicant = req.body.applicant;
        const amount = req.body.amount;
        const status = req.body.status;

        const item =  itemService.createLoan(applicant, amount, status);
        res.status(HTTP_STATUS.OK).json({ message:"Loan application updated", data:item});
    }catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: `Failed to create project: ${error.message}` });
        }
        return res.status(500).json({ message: "Failed to create project: Unknown error" });
    }

};

export const updateLoanHandler = (req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const { applicant, amount, status } = req.body as{
            applicant: string;
            amount: number;
            status: LoanStatus;
        };

        const item =  itemService.updateLoan(id, applicant, amount, status);
        res.status(HTTP_STATUS.OK).json({ message:"Loan application updated", data:item});
    }catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: `Failed to create project: ${error.message}` });
        }
        return res.status(500).json({ message: "Failed to create project: Unknown error" });
    }
};

export const deleteLoanHandler = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deletedProject = itemService.deleteLoan(id);

    return res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Project not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Unknown error" });
  }
};

export const getLoanHandler = (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const items = itemService.getLoan(id);
        res.status(HTTP_STATUS.OK).json({ message: "Loan applications retrieved", data: items });
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: `Failed to create project: ${error.message}` });
    }
    return res.status(500).json({ message: "Failed to create project: Unknown error" });
  }
};

export const signInHandler = async(req:Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const userSignIn = Users.find(u => u.email === email && u.password === password);

        if (!userSignIn) {
            return res.status(401).json({
                success: false,
                    error: {
                        message: "Forbidden: Insufficient role",
                        code: "INSUFFICIENT_ROLE"
                    },
                    timestamp: new Date().toISOString()
            });
        }

        res.status(200).json({
            idToken: `mock-idToken-${userSignIn.uid}`,
            email: userSignIn.email,
            localId: `${userSignIn.role}-uid-${userSignIn.id}`,
            expiresIn: "3600",
            refreshToken: `mock-refreshToken-token`
        });
    }catch (error: unknown) {
        if (error instanceof Error) {
        return res.status(500).json({ message: `Failed to create project: ${error.message}` });
        }
        return res.status(500).json({ message: "Failed to create project: Unknown error" });
    }
};
