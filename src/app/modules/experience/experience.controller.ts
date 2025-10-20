import { Request, Response } from "express";
import { ExperienceService } from "./experience.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.createExperience(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getAllExperiences();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experiences retrieved successfully",
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getSingleExperience(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience retrieved successfully",
    data: result,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.updateExperience(Number(req.params.id), req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  await ExperienceService.deleteExperience(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience deleted successfully",
    data: null,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};