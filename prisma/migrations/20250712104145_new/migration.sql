/*
  Warnings:

  - You are about to drop the column `amount` on the `UserSubscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `durationDays` on the `UserSubscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `UserSubscriptions` table. All the data in the column will be lost.
  - Added the required column `expiryTime` to the `UserSubscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSubscriptions" DROP COLUMN "amount",
DROP COLUMN "durationDays",
DROP COLUMN "isActive",
ADD COLUMN     "expiryTime" TEXT NOT NULL;
