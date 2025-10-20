import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { ProjectRoutes } from "../modules/projects/projects.route";
import { SkillRoutes } from "../modules/skill/skill.route";
import { ExperienceRoutes } from "../modules/experience/experience.route";
import { BlogRoutes } from "../modules/blogs/blog.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});