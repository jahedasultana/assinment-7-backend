import { UserRole } from "@prisma/client";
import { envVars } from "../config/env";
import bcrypt from "bcryptjs";
import { prisma } from "../config/db";

const seedAdmin = async () => {
  try {
    console.log("Connecting to database...");
    await prisma.$connect();
    console.log("Database connected successfully");

    const isExistAdmin = await prisma.admin.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });
    
    
    if (isExistAdmin) {
       console.log("Admin already exists")
      return;
    }

    console.log("Creating admin user...");
    const hashedPassword = await bcrypt.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const admin = await prisma.admin.create({
      data: {
        name: "abc",
        email: envVars.ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });
    
    console.log("Admin created successfully:", {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();