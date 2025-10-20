import { prisma } from "../../../config/db";

const createProject = async (payload: any) => {
  return await prisma.project.create({
    data: payload,
  });
};

// const getAllProjects = async () => {
//   return await prisma.project.findMany({
//     include: {
//       admin: {
//         select: {
//           name: true,
//           email: true,
//         },
//       },
//     },
//   });
// };

// const getSingleProject = async (id: number) => {
//   return await prisma.project.findUnique({
//     where: { id },
//     include: {
//     admin: {
//         select: {
//           name: true,
//           email: true,
//         },
//       },
//     },
//   });
// };

const getAllProjects = async () => {
  return await prisma.project.findMany();
};

const getSingleProject = async (id: number) => {
  return await prisma.project.findUnique({
    where: { id },
  });
};


const updateProject = async (id: number, payload: any) => {
  return await prisma.project.update({
    where: { id },
    data: payload,
  });
};

const deleteProject = async (id: number) => {
  return await prisma.project.delete({
    where: { id },
  });
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};