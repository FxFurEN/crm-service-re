/*
  Warnings:

  - You are about to drop the column `positionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_positionId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "positionId";

-- DropTable
DROP TABLE "Position";
