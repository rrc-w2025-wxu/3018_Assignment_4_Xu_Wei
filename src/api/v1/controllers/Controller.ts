import { Request, Response, NextFunction } from "express";
import * as itemService from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Users } from "../../../userData";
import { LoanStatus } from "../../../interface_properties";


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

export const getAllLoansHandler = (req: Request, res: Response, next: NextFunction) => {
    try{
        const items = itemService.getAllLoans();
        const count: number = items.length;
        res.status(HTTP_STATUS.OK).json({ message: "Loan applications retrieved", count, data: items });
    }catch (error: unknown) {
        if (error instanceof Error) {
            next(error); 
        } else {
            next(new Error("Unknown error"));
        }
    }
};
    
export const createLoanHandler = (req:Request, res:Response, next: NextFunction) => {
    try{
        const applicant = req.body.applicant;
        const amount = req.body.amount;
        const status = req.body.status;

        const item =  itemService.createLoan(applicant, amount, status);
        res.status(HTTP_STATUS.OK).json({ message:"Loan application updated", data:item});
    }catch (error: unknown) {
        if (error instanceof Error) {
            next(error); 
        } else {
            next(new Error("Unknown error"));
        }
    }
};

export const updateLoanHandler = (req:Request, res:Response, next: NextFunction) => {
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
            next(error); 
        } else {
            next(new Error("Unknown error"));
        }
    }
};

export const deleteLoanHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    itemService.deleteLoan(id);

    return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: {
            message: "Loan application not found",
            code: "LOAN_NOT_FOUND"
        },
        timestamp: new Date().toISOString()
    });
  }catch (error: unknown) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            error: {
                message: "Loan application not found",
                code: "LOAN_NOT_FOUND"
            },
            timestamp: new Date().toISOString()
        });
    }
};

export const getLoanHandler = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const items = itemService.getLoan(id);
        res.status(HTTP_STATUS.OK).json({ message: "Loan applications retrieved", data: items });
    }catch (error: unknown) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: {
            message: "Loan application not found",
            code: "LOAN_NOT_FOUND"
        },
        timestamp: new Date().toISOString()
        });
    }
};

export const signInHandler = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;
        const userSignIn = Users.find(u => u.email === email && u.password === password);

        if (!userSignIn) {
            return res.status(401).json({
                success: false,
                    error: {
                        message: "Invalid email or password",
                        code: "INVALID_CREDENTIALS"
                    },
                    timestamp: new Date().toISOString()
            });
        }

        res.status(200).json({
            idToken: `mock-idToken-${userSignIn.uid}`,
            email: userSignIn.email,
            localId: `${userSignIn.role}-uid-${userSignIn.id}`,
            expiresIn: "3600",
            refreshToken: `mock-refresh-token`
        });
    }catch (error: unknown) {
        if (error instanceof Error) {
            next(error); 
        } else {
            next(new Error("Unknown error"));
        }
    }
};
