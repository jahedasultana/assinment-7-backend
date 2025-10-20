import { Request, Response } from "express";
import { SkillService } from "./skill.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { uploadToCloudinary } from "../../middleware/uploadImage";


const createSkill = catchAsync(async (req: Request, res: Response) => {
  let imageUrl = req.body.image;
  
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
  }
  
  const skillData = {
    ...req.body,
    adminId: req.body.adminId?.trim(),
    image: imageUrl,
  };
  
  const result = await SkillService.createSkill(skillData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const { type } = req.query;
  const result = await SkillService.getAllSkills(type as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
  });
});

const getTechnicalSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getTechnicalSkills();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Technical skills retrieved successfully",
    data: result,
  });
});

const getSoftSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getSoftSkills();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Soft skills retrieved successfully",
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getSingleSkill(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.updateSkill(Number(req.params.id), req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  await SkillService.deleteSkill(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill deleted successfully",
    data: null,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getTechnicalSkills,
  getSoftSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};