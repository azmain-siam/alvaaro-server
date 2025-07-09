-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "SubscriptionPlan_id_key";
