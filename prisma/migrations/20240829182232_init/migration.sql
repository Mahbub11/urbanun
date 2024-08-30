-- CreateTable
CREATE TABLE "property_images" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingId" INTEGER NOT NULL,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
