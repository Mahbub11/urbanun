-- DropForeignKey
ALTER TABLE "property_images" DROP CONSTRAINT "property_images_listingId_fkey";

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
