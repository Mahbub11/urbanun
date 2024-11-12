// src/app/listings/page.tsx (or whatever path your file is under)

import PropertyListingPage from "@/container/property/property-listing-page";
import prisma from "@/lib/prisma";
import { filterAndSortProperties } from "@/lib/utils";
import { Property, getListingDataSelect } from "@/types/prisma-data-type";
import { PropertyWithImages, SearchParamsTypes } from "@/types/property-items";

// Function to fetch the listing data
async function fetchListings(filters: SearchParamsTypes) {
  const rawListings = await prisma.listing.findMany({
    select: getListingDataSelect(), // Assuming this function is defined somewhere
  });

  const filterData = filterAndSortProperties(rawListings, filters);

  return filterData.map((listing) => ({
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

// This is the page component
export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsTypes;
}) {
  // Fetch the listings data during SSR or ISR

  const filters = {
    features: searchParams.features ? searchParams.features : [], // Ensure it's an array, even if it's a single string
    type: searchParams.type || "", // Default to an empty string if not provided
    category: searchParams.category || "",
    bed_rooms: searchParams.bed_rooms || "",
    bath_rooms: searchParams.bath_rooms || "",
    location: searchParams.location || "", // Default to an empty string if not provided
    priceMin: searchParams.priceMin ? searchParams.priceMin : "100", // Default to 10
    priceMax: searchParams.priceMax ? searchParams.priceMax : "500000", // Default to 500000
  };

  console.log(filters);

  const listings: Property[] = await fetchListings(filters);

  return (
    <div className="px-5 py-10">
      <PropertyListingPage properties={listings ? listings : []} />
    </div>
  );
}

// ISR - Define when this page should be revalidated
export const revalidate = 60 * 60; // Revalidate every hour (in seconds)
