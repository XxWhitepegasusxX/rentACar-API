/*
  Warnings:

  - Made the column `updated_at` on table `Rentals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rentals" ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
