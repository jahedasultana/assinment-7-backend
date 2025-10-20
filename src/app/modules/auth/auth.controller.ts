import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const result = await authService.loginUser(data);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
   sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "logged in successfully",
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});
export const authController = {
  loginUser,
  refreshToken,
};