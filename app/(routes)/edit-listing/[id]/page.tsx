import { AddListing } from "@/components/listing/add-listing";
import EditListingContainer from "@/container/dashboard/listing/edit-listing-conatiner";
import { PropertySchemaWithImageAddressCordinates } from "@/types/property-items";
import prisma from "@/utils/prisma/client";
import React from "react";
import { z } from "zod";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export default async function Page({ params }: { params: { id: string } }) {
  const parseData = parseInt(params.id, 10);

  const getData = await prisma.listing.findUnique({
    where: {
      id: parseData,
    },
    include: {
      images: true, // Include related images
    },
  });
  // direct server data to client component as safe parse not required
  // const mappingData = {
  //   id: parseData,
  //   title: getData?.title ? getData.title : "",
  //   type: getData?.type ? getData.type : 0,
  //   description: getData?.description ? getData.description : "",
  //   property_features: getData?.property_features
  //     ? getData.property_features
  //     : "",
  //   size: getData?.size ? getData.size : "",
  //   bed_rooms: getData?.bed_rooms ? getData.bed_rooms : "",
  //   bath_rooms: getData?.bath_rooms ? getData.bath_rooms : "",
  //   floor: getData?.floor ? getData.floor : "",
  //   construction_year: getData?.construction_year
  //     ? getData.construction_year
  //     : "",
  //   price: getData?.price ? getData?.price : 0,
  //   images: getData?.images ? getData?.images : [],
  //   address: getData?.address ? getData?.address : "",
  //   coordinates: {
  //     lat: 0,
  //     lng: 0,
  //   },
  // };

  if(!getData){
    return <div>Loading</div>
  }

  return (
    <div className="px-10 py-5 sm:w-full md:w-[90%] mx-auto">
      <div>
        <h1 className="text-[25px] font-bold font-moder">
          Property Information
        </h1>
      </div>
      {/* <EditListingContainer id={parseData!}></EditListingContainer> */}
      {/* <AddListing listingData={mappingData}></AddListing> */}
    </div>
  );
}
