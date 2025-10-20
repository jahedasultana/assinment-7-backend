import { Router } from "express";
import { BlogController } from "./blog.controller";
import { upload } from "../../middleware/uploadImage";

const router = Router();

router.post("/", upload.single("photo"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);
router.put("/:id", upload.single("photo"), BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;