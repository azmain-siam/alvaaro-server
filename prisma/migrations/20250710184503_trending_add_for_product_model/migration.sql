/*
  Warnings:

  - You are about to drop the column `trending` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Yacht` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "Jewellery" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RealEstate" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "Yacht" DROP COLUMN "trending";
