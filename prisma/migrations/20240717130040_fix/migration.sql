/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Execution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Execution" DROP CONSTRAINT "Execution_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Execution" DROP CONSTRAINT "Execution_stageId_fkey";

-- DropForeignKey
ALTER TABLE "Execution" DROP CONSTRAINT "Execution_userId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- AlterTable
ALTER TABLE "Execution" DROP COLUMN "deletedAt",
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DEFAULT '-',
ALTER COLUMN "orderId" DROP NOT NULL,
ALTER COLUMN "orderId" SET DEFAULT '-',
ALTER COLUMN "stageId" DROP NOT NULL,
ALTER COLUMN "stageId" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "userId" SET DEFAULT '-',
ALTER COLUMN "clientId" SET DEFAULT '-',
ALTER COLUMN "serviceId" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "categoryId" SET DEFAULT '-';

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
