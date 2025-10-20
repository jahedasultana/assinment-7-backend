import { Router } from "express";
import { SkillController } from "./skill.controller";
import { upload } from "../../middleware/uploadImage";

const router = Router();

router.post("/", upload.single("image"), SkillController.createSkill);
router.get("/", SkillController.getAllSkills);
router.get("/technical", SkillController.getTechnicalSkills);
router.get("/soft", SkillController.getSoftSkills);
router.get("/:id", SkillController.getSingleSkill);
router.put("/:id", SkillController.updateSkill);
router.delete("/:id", SkillController.deleteSkill);

export const SkillRoutes = router;