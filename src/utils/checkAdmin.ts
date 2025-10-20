import { prisma } from "../config/db";

const checkAdmin = async () => {
  const admin = await prisma.admin.findFirst();
  console.log("Admin ID:", admin?.id);
  console.log("Admin Email:", admin?.email);
  await prisma.$disconnect();
};

checkAdmin();