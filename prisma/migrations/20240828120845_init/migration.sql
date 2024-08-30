-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
