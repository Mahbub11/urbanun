/*
  Warnings:

  - You are about to drop the column `bathrooms` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "bathrooms",
DROP COLUMN "bedrooms",
DROP COLUMN "sizes",
ADD COLUMN     "bath_rooms" TEXT,
ADD COLUMN     "bed_rooms" TEXT,
ADD COLUMN     "size" TEXT;
