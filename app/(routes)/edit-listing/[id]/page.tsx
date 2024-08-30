import { AddListing } from "@/components/listing/add-listing";
import React from "react";

export default function page(params:number) {

  console.log(params)
  return (
    <div className="px-10 py-5">
      <div>
        <h1 className="text-[25px] font-bold font-moder">
          Add Property Information
        </h1>
      </div>
      <AddListing ></AddListing>
    </div>
  );
}
