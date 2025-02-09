/*
  Warnings:

  - Made the column `providerAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "expires_at" INTEGER,
ALTER COLUMN "providerAccountId" SET NOT NULL;
