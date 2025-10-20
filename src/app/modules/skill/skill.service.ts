import { prisma } from "../../../config/db";
import { SkillType } from "@prisma/client";

const createSkill = async (payload: any) => {
  return await prisma.skill.create({
    data: payload,
  });
};

const getAllSkills = async (type?: string) => {
  const whereClause = type ? { type: type as SkillType } : {};
  
  return await prisma.skill.findMany({
    where: whereClause,
    include: {
      admin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const getTechnicalSkills = async () => {
  return await prisma.skill.findMany({
    where: { type: SkillType.TECHNICAL },
    include: {
      admin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const getSoftSkills = async () => {
  return await prisma.skill.findMany({
    where: { type: SkillType.SOFT },
    include: {
      admin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const getSingleSkill = async (id: number) => {
  return await prisma.skill.findUnique({
    where: { id },
    include: {
      admin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

const updateSkill = async (id: number, payload: any) => {
  return await prisma.skill.update({
    where: { id },
    data: payload,
  });
};

const deleteSkill = async (id: number) => {
  return await prisma.skill.delete({
    where: { id },
  });
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getTechnicalSkills,
  getSoftSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};