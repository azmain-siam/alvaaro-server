/*
  Warnings:

  - A unique constraint covering the columns `[sellerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sellerId_key" ON "Product"("sellerId");
