import { Request, Response } from "express";
import { ProjectService } from "./projects.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { uploadToCloudinary } from "../../middleware/uploadImage";


const createProject = catchAsync(async (req: Request, res: Response) => {
  let imageUrl;
  
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
  }
  
  const { features, technologies, ...otherData } = req.body || {};
  
  const projectData = {
    ...otherData,
    adminId: otherData?.adminId?.trim(),
    features: features ? (Array.isArray(features) ? features : [features]) : [],
    technologies: technologies ? (Array.isArray(technologies) ? technologies : [technologies]) : [],
  };
  
  // Only add image if we have one
  if (imageUrl) {
    projectData.image = imageUrl;
  }
  
  const result = await ProjectService.createProject(projectData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleProject(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});


const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  let imageUrl;
  
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
  }
  
  
  const { features, technologies, ...otherData } = req.body || {};
  
  const updateData: any = {
    ...otherData,
    features: features ? (Array.isArray(features) ? features : [features]) : [],
    technologies: technologies ? (Array.isArray(technologies) ? technologies : [technologies]) : [],
  };
  

  if (imageUrl) {
    updateData.image = imageUrl;
  }
  
  const result = await ProjectService.updateProject(Number(id), updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});


const deleteProject = catchAsync(async (req: Request, res: Response) => {
  await ProjectService.deleteProject(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: null,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};