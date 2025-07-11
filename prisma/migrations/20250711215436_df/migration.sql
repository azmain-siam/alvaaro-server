/*
  Warnings:

  - You are about to drop the column `userId` on the `UserSubscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerId]` on the table `UserSubscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscribedPlan]` on the table `UserSubscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerId` to the `UserSubscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_userId_fkey";

-- DropIndex
DROP INDEX "UserSubscriptions_userId_key";

-- AlterTable
ALTER TABLE "UserSubscriptions" DROP COLUMN "userId",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptions_sellerId_key" ON "UserSubscriptions"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptions_subscribedPlan_key" ON "UserSubscriptions"("subscribedPlan");

-- AddForeignKey
ALTER TABLE "UserSubscriptions" ADD CONSTRAINT "UserSubscriptions_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptions" ADD CONSTRAINT "UserSubscriptions_subscribedPlan_fkey" FOREIGN KEY ("subscribedPlan") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
