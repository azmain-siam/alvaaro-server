/*
  Warnings:

  - You are about to drop the `UserSubscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_subscribedPlan_fkey";

-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "features" TEXT[],
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "images" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserSubscriptions";

-- CreateTable
CREATE TABLE "UserSubscriptionValidity" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "subscribedPlan" TEXT NOT NULL,
    "expiryTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_id_key" ON "UserSubscriptionValidity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_sellerId_key" ON "UserSubscriptionValidity"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_subscribedPlan_key" ON "UserSubscriptionValidity"("subscribedPlan");

-- AddForeignKey
ALTER TABLE "UserSubscriptionValidity" ADD CONSTRAINT "UserSubscriptionValidity_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionValidity" ADD CONSTRAINT "UserSubscriptionValidity_subscribedPlan_fkey" FOREIGN KEY ("subscribedPlan") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
