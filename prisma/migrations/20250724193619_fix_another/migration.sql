-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('CAR', 'WATCH', 'JEWELLERY', 'REAL_ESTATE', 'YACHT');

-- CreateEnum
CREATE TYPE "SubscriptionPlanType" AS ENUM ('BASIC', 'BUSINESS', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UserSubscriptionValidity" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "subscribedPlan" TEXT NOT NULL,
    "expiryTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "images" TEXT[],
    "category" "CategoryType" NOT NULL,
    "trending" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "manufacture" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "carBodyStyle" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "cylinders" TEXT NOT NULL,
    "tractionType" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Watch" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "manufacture" TEXT NOT NULL,
    "warranty" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "waterResistance" TEXT NOT NULL,
    "displayType" TEXT NOT NULL,
    "strapMaterial" TEXT NOT NULL,
    "movement" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "tractionType" TEXT NOT NULL,
    "features" TEXT[]
);

-- CreateTable
CREATE TABLE "Jewellery" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "manufacture" TEXT NOT NULL,
    "warranty" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "waterResistance" TEXT NOT NULL,
    "displayType" TEXT NOT NULL,
    "strapMaterial" TEXT NOT NULL,
    "movement" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "tractionType" TEXT NOT NULL,
    "features" TEXT[]
);

-- CreateTable
CREATE TABLE "RealEstate" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "beds" TEXT NOT NULL,
    "washroom" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "text" TEXT[],
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "feature" TEXT[]
);

-- CreateTable
CREATE TABLE "Yacht" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "beds" TEXT NOT NULL,
    "washroom" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "text" TEXT[],
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "feature" TEXT[]
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "type" "SubscriptionPlanType" NOT NULL,
    "length" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "features" TEXT[],
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_id_key" ON "Seller"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "Seller"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_id_key" ON "UserSubscriptionValidity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_sellerId_key" ON "UserSubscriptionValidity"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptionValidity_subscribedPlan_key" ON "UserSubscriptionValidity"("subscribedPlan");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Car_id_key" ON "Car"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Car_productId_key" ON "Car"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Watch_id_key" ON "Watch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Watch_productId_key" ON "Watch"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Jewellery_id_key" ON "Jewellery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Jewellery_productId_key" ON "Jewellery"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_id_key" ON "RealEstate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstate_productId_key" ON "RealEstate"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Yacht_id_key" ON "Yacht"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Yacht_productId_key" ON "Yacht"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_type_key" ON "SubscriptionPlan"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_id_key" ON "Newsletter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionValidity" ADD CONSTRAINT "UserSubscriptionValidity_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionValidity" ADD CONSTRAINT "UserSubscriptionValidity_subscribedPlan_fkey" FOREIGN KEY ("subscribedPlan") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jewellery" ADD CONSTRAINT "Jewellery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yacht" ADD CONSTRAINT "Yacht_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
