"use client";

import { PropertyWithImages } from "@/types/property-items";
import React from "react";
import { Property } from "@/types/prisma-data-type";
import PropertyCardView from "../property/property-card-view";

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="h-auto w-full">
      <div className="grid grid-cols-3 gap-x-2 gap-y-10">
        {properties.map((data, index) => {
          return (
            <div key={index}>
              <PropertyCardView property={data}></PropertyCardView>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyList;
