"use client";
import { UseGetAllProperty } from "@/app/services/property/queries";
import { ListingColumns } from "@/components/listing-table/column";
import { ListingDataTable } from "@/container/dashboard/listing/listing-data-table";
import React from "react";

export default  function page() {
  const { data: listing, error, isLoading } = UseGetAllProperty();
  if (error || isLoading) {
    return <div>No Listing Found</div>;
  }

  console.log(listing);

  return (
    <div className="pt-[5rem]">
      <ListingDataTable
        data={listing!}
        columns={ListingColumns}
      ></ListingDataTable>
    </div>
  );
}
