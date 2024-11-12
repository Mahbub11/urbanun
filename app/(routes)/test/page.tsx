
import PropertyComparison from "@/container/test/PropertyComparison";
import prisma from "@/lib/prisma";
import { Property, getListingDataSelect } from "@/types/prisma-data-type";

async function fetchListings() {
    const rawListings = await prisma.listing.findMany({
      select: getListingDataSelect(), // Assuming this function is defined somewhere
    });
  
    return rawListings.map((listing) => ({
      ...listing,
      images: listing.images.map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        order: image.order,
      })),
      User: {
        id: listing.userId,
        email: listing.user.email,
        avatar: listing.user.avatar,
      },
      coordinates: listing.coordinates ?? {},
    }));
  }
export default async function ComparePage() {

    const listings: Property[] = await fetchListings();

  if (listings.length <= 0) {
    return (
      <p className="text-center text-gray-500">No properties available.</p>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Compare Real Estate Properties</h1>
      <PropertyComparison properties={listings} />
    </div>
  );
}