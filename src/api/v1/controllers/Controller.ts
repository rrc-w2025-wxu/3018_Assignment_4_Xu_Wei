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

/**
 * GET /api/v1/loans
 * Retrieve all loan applications.
 * 
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON containing all loans and count
 */
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

/**
 * POST /api/v1/loans
 * Create a new loan application.
 * 
 * @param req.body.applicant - Applicant name
 * @param req.body.amount - Loan amount
 * @param req.body.status - Loan status (LoanStatus type)
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON containing the newly created loan
 */
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

/**
 * PUT /api/v1/loans/:id
 * Update an existing loan application.
 * 
 * @param req.params.id - Loan ID to update
 * @param req.body.applicant - Updated applicant name
 * @param req.body.amount - Updated loan amount
 * @param req.body.status - Updated loan status
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON containing the updated loan
 */
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

/**
 * DELETE /api/v1/loans/:id
 * Delete a loan application.
 * 
 * @param req.params.id - Loan ID to delete
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON with success false if not found, or success true if deleted
 */
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

/**
 * GET /api/v1/loans/:id
 * Retrieve a single loan by ID.
 * 
 * @param req.params.id - Loan ID
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON containing the loan data or 404 if not found
 */
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

/**
 * POST /api/v1/auth/signin
 * User sign-in endpoint.
 * 
 * @param req.body.email - User email
 * @param req.body.password - User password
 * @param res - Express Response
 * @param next - Express NextFunction for error handling
 * @returns JSON with mock idToken if credentials match, else 401
 */
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
