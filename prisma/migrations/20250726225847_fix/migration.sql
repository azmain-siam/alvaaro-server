/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Seller` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationStatusType" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "isVerified",
ADD COLUMN     "verificationStatus" "VerificationStatusType" NOT NULL DEFAULT 'PENDING';
