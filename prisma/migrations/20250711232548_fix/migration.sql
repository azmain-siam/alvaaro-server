/*
  Warnings:

  - You are about to drop the column `category` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `jewelleryId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Jewellery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Jewellery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Jewellery" DROP CONSTRAINT "Jewellery_sellerId_fkey";

-- AlterTable
ALTER TABLE "Jewellery" DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "sellerId",
DROP COLUMN "trending",
DROP COLUMN "updatedAt",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "jewelleryId";

-- CreateIndex
CREATE UNIQUE INDEX "Jewellery_productId_key" ON "Jewellery"("productId");

-- AddForeignKey
ALTER TABLE "Jewellery" ADD CONSTRAINT "Jewellery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
