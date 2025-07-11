/*
  Warnings:

  - You are about to drop the column `productId` on the `Jewellery` table. All the data in the column will be lost.
  - Added the required column `category` to the `Jewellery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Jewellery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Jewellery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Jewellery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Jewellery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Jewellery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Jewellery" DROP CONSTRAINT "Jewellery_productId_fkey";

-- DropIndex
DROP INDEX "Jewellery_productId_key";

-- AlterTable
ALTER TABLE "Jewellery" DROP COLUMN "productId",
ADD COLUMN     "category" "CategoryType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "trending" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "jewelleryId" TEXT;

-- AddForeignKey
ALTER TABLE "Jewellery" ADD CONSTRAINT "Jewellery_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
