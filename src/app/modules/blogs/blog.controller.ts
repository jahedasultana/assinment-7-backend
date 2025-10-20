import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { uploadToCloudinary } from "../../middleware/uploadImage";


const createBlog = catchAsync(async (req: Request, res: Response) => {
  let photoUrl = req.body.photo;
  
  if (req.file) {
    photoUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
  }
  
  const blogData = {
    concept: req.body.concept,
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    adminId: req.body.adminId,
    photo: photoUrl,
  };
  
  const result = await BlogService.createBlog(blogData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingleBlog(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  let photoUrl = req.body.photo;
  
  if (req.file) {
    photoUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
  }
  
  const updateData = {
    concept: req.body.concept,
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    adminId: req.body.adminId,
    ...(photoUrl && { photo: photoUrl }),
  };
  
  const result = await BlogService.updateBlog(Number(req.params.id), updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogService.deleteBlog(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};