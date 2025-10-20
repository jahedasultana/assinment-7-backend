import { PrismaClient, UserRole } from "@prisma/client";

import bcrypt from "bcrypt";
import status from "http-status";
import AppError from "../../../errors/AppError";
import { generateToken, verifyToken } from "../../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../../config/env";

const prisma = new PrismaClient();
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.admin.findUnique({
    where: {
      email: payload.email,
    },
  });
    console.log('Found user data:', userData); 

  if (!userData) {
    throw new AppError(status.NOT_FOUND, "admin Does not exist");
  }
  // check is password correct
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }
  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET as string,
    envVars.JWT_ACCESS_EXPIRES as string 
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES as string
  );
  return {
    accessToken,
    refreshToken,
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, envVars.JWT_REFRESH_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("you are not authorized");
  }
  const userData = await prisma.admin.findUnique({
    where: {
      email: decodedData?.email,
      role: UserRole.ADMIN,
    },
  });
  if (!userData) {
    throw new AppError(status.NOT_FOUND, "admin Does not exist");
  }
  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    envVars.JWT_ACCESS_SECRET as string ,
    envVars.JWT_ACCESS_EXPIRES as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
export const authService = {
  loginUser,
  refreshToken,
};
