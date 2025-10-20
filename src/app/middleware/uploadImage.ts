import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import { envVars } from "../../config/env";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const uploadToCloudinary = async (buffer: Buffer, fileName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: `portfolio/${fileName}-${Date.now()}`,
        folder: "portfolio",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      }
    ).end(buffer);
  });
};

export { upload, uploadToCloudinary };