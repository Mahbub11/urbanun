import PropertyList from "@/components/home/property-list";
import PropertyCardView from "@/components/property/property-card-view";
import {
  Property,
  PropertyCoordinate,
  getListingDataSelect,
} from "@/types/prisma-data-type";
import prisma from "@/utils/prisma/client";
import React from "react";

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
export default async function PopularChoice() {
  const listings: Property[] = await fetchListings();

  if (listings.length <= 0) {
    return (
      <p className="text-center text-gray-500">No properties available.</p>
    );
  }
  return (
    <div
      className=" md:px-10 md:w-[90%] lg2:w-[80%] sm:w-full sm:px-4  md:py-5 mx-auto 
     font-montreal text-gray-700"
    >
      <h2 className="font-gvf text-[40px] font-[400] leading-tight">
        Our choice of popular <br />
        <span className="font-[600] text-yellow-500">Real Estate</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 
      gap-y-10 mt-10 w-full h-full">
        {listings.slice(0,6).map((data, index) => {
          return (
            <div className="h-full" key={index}>
              <PropertyCardView property={data}></PropertyCardView>
            </div>
          );
        })}
      </div>
    </div>
  );
}
