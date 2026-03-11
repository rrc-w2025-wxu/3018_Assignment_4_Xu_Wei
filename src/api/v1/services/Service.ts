import { projects } from "../../../data";
import { Project } from "../../v1/../../interface_properties";
import admin from "firebase-admin";


export const createProject = (name: string, status: string):Project => {
    try{
        const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;

        const newProject: Project = {
        id: newId,
        name,
        status,
        createdAt: new Date().toISOString(), 
        };

        projects.push(newProject); 
        return newProject;
    }catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(`Failed to create event: ${error.message}`);
        } else {
        throw new Error("Failed to create event: Unknown error");
        }
    }
};

export const getAllProjects = () => {
    try{
        const allProjects:Project[] = projects;
        return allProjects;
    }catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(`Failed to create event: ${error.message}`);
        } else {
        throw new Error("Failed to create event: Unknown error");
        }
    }
};


export const getProject = (id: number): Project => {
    try {
        const project = projects.find(p => p.id === Number(id));
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

export const updateProject = (id: number, name?: string, status?: string): Project => {
  try {
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error("Project not found");

    if (name) project.name = name;
    if (status) project.status = status;

    return project;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to update project: ${error.message}`);
    throw new Error("Failed to update project: Unknown error");
  }
};

export const deleteProject = (id: number): Project => {
  try {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");

    const deleted = projects.splice(index, 1)[0];
    return deleted;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to delete project: ${error.message}`);
    throw new Error("Failed to delete project: Unknown error");
  }
};

export const setCustomClaimsService = async (email: string, role: string): Promise<void> => {
  try {
    if (!email || !role) throw new Error("Missing email or role");

    await admin.auth().setCustomUserClaims(email, { role });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Failed to set custom claims: ${error.message}`);
    throw new Error("Failed to set custom claims: Unknown error");
  }
};