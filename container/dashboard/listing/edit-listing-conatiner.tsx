"use client";

import { useGetProperty } from "@/app/services/property/queries";
import { PropertyWithImages } from "@/types/property-items";
import React, { useEffect, useState } from "react";
import { EditListing } from "./edit-listing";

interface Props {
  id: number;
}

export default function EditListingContainer({ id }: Props) {
  const { data: property, error, isLoading } = useGetProperty(id);
  const [propertyData, setPropertyData] = useState<PropertyWithImages | null>(null);

  useEffect(() => {
    if (property) {
      setPropertyData(property);
    }
  }, [property,propertyData]);

  if (isLoading) return <div>Loading....</div>;
  if (error || !propertyData) return <div>Error loading property.</div>;
  console.log(propertyData)

  return (
    <div>
      <EditListing listingData={propertyData} />
    </div>
  );
}
