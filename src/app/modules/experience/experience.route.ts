import { Router } from "express";
import { ExperienceController } from "./experience.controller";

const router = Router();

router.post("/", ExperienceController.createExperience);
router.get("/", ExperienceController.getAllExperiences);
router.get("/:id", ExperienceController.getSingleExperience);
router.put("/:id", ExperienceController.updateExperience);
router.delete("/:id", ExperienceController.deleteExperience);

export const ExperienceRoutes = router;