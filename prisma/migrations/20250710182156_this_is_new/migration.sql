/*
  Warnings:

  - You are about to drop the column `trending` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Jewellery" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "RealEstate" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Yacht" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;
