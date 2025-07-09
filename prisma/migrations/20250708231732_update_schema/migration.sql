/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Jewellery` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Yacht` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Jewellery" DROP CONSTRAINT "Jewellery_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "RealEstate" DROP CONSTRAINT "RealEstate_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Watch" DROP CONSTRAINT "Watch_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Yacht" DROP CONSTRAINT "Yacht_sellerId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "sellerId";

-- AlterTable
ALTER TABLE "Jewellery" DROP COLUMN "sellerId";

-- AlterTable
ALTER TABLE "RealEstate" DROP COLUMN "sellerId";

-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "sellerId";

-- AlterTable
ALTER TABLE "Yacht" DROP COLUMN "sellerId";
