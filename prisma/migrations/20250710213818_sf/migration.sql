/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_productId_key" ON "Car"("productId");
