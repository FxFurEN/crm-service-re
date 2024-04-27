/*
  Warnings:

  - You are about to drop the column `Password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `initials` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `sign` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_login_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "Password",
DROP COLUMN "email",
DROP COLUMN "initials",
DROP COLUMN "login",
DROP COLUMN "sign",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
