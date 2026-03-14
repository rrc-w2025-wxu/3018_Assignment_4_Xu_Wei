import { loanApplications } from "../../../data";
import { LoanApplication } from "../../../data";
import { LoanStatus } from "src/interface_properties";

/**
 * Create a new loan application
 *
 * @param applicant - Name of the applicant
 * @param amount - Loan amount
 * @param status - Initial status of the loan (default: 'pending')
 * @returns The newly created LoanApplication object
 * @throws Error if creation fails
 */
export const createLoan = (
    applicant: string, 
    amount:number, 
    status: 'pending' | 'under_review' | 'flagged' = 'pending'
):LoanApplication => {
    try{
        const newId = loanApplications.length ? loanApplications[loanApplications.length - 1].id + 1 : 1;
        const newProject: LoanApplication = {
            id: newId,
            applicant,
            amount,
            status,
            createdAt: new Date().toISOString(), 
        };
        loanApplications.push(newProject); 
        return newProject;
    }catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(`Failed to create event: ${error.message}`);
        } else {
        throw new Error("Failed to create event: Unknown error");
        }
    }
};

/**
 * Retrieve all loan applications
 *
 * @returns An array of all LoanApplication objects
 * @throws Error if retrieval fails
 */
export const getAllLoans = () => {
    try{
        const allProjects:LoanApplication[] = loanApplications;
        return allProjects;
    }catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(`Failed to create event: ${error.message}`);
        } else {
        throw new Error("Failed to create event: Unknown error");
        }
    }
};

/**
 * Retrieve a single loan application by ID
 *
 * @param id - ID of the loan application
 * @returns The LoanApplication object with the given ID
 * @throws Error if the loan is not found or retrieval fails
 */
export const getLoan = (id: number): LoanApplication => {
    try {
        const project = loanApplications.find(p => p.id === Number(id));
        if (!project) throw new Error("Project not found");
        return project;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to get project: ${error.message}`);
        } else {
            throw new Error("Failed to get project: Unknown error");
        }
    }
};

/**
 * Update an existing loan application
 *
 * @param id - ID of the loan to update
 * @param applicant - New applicant name
 * @param amount - New loan amount
 * @param status - New loan status
 * @returns The updated LoanApplication object
 * @throws Error if the loan is not found or update fails
 */
export const updateLoan = (id: number, applicant: string, amount:number, status: LoanStatus): LoanApplication => {
  try {
    const project = loanApplications.find(p => p.id === id);
    if (!project) throw new Error("Project not found");

    if (applicant) project.applicant = applicant;
    if (amount) project.amount = amount;
    if (status) project.status = status;

    return project;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to update project: ${error.message}`);
    throw new Error("Failed to update project: Unknown error");
  }
};

/**
 * Delete a loan application by ID
 *
 * @param id - ID of the loan to delete
 * @returns The deleted LoanApplication object
 * @throws Error if the loan is not found or deletion fails
 */
export const deleteLoan = (id: number): LoanApplication => {
  try {
    const index = loanApplications.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");

    const deleted = loanApplications.splice(index, 1)[0];
    return deleted;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to delete project: ${error.message}`);
    throw new Error("Failed to delete project: Unknown error");
  }
};
