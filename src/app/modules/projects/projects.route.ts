import { Router } from "express";
import { ProjectController } from "./projects.controller";
import { upload } from "../../middleware/uploadImage";

const router = Router();

router.post("/", upload.single("image"), ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getSingleProject);
router.put("/:id",upload.single("image"), ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;