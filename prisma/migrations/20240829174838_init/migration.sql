-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "bathrooms" TEXT,
ADD COLUMN     "bedrooms" TEXT,
ADD COLUMN     "construction_year" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "property_features" TEXT,
ADD COLUMN     "sizes" TEXT,
ADD COLUMN     "title" TEXT;
