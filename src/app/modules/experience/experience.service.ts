import { prisma } from "../../../config/db";

const createExperience = async (payload: any) => {
  return await prisma.experience.create({
    data: payload,
  });
};

const getAllExperiences = async () => {
  return await prisma.experience.findMany({
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

const getSingleExperience = async (id: number) => {
  return await prisma.experience.findUnique({
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

const updateExperience = async (id: number, payload: any) => {
  return await prisma.experience.update({
    where: { id },
    data: payload,
  });
};

const deleteExperience = async (id: number) => {
  return await prisma.experience.delete({
    where: { id },
  });
};

export const ExperienceService = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};