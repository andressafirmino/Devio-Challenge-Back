/*
  Warnings:

  - You are about to drop the column `quantity` on the `OrderedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SideDishe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SideDishe" DROP CONSTRAINT "SideDishe_productId_fkey";

-- AlterTable
ALTER TABLE "OrderedProduct" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "SideDishe" DROP COLUMN "productId";
