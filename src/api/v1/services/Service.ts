import { loanApplications } from "../../../data";
import { LoanApplication } from "../../../data";
import { LoanStatus } from "src/interface_properties";


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
