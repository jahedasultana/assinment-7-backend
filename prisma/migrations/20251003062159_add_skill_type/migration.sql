-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('TECHNICAL', 'SOFT');

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "type" "SkillType" NOT NULL DEFAULT 'TECHNICAL';
