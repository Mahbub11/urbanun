import FilterBar from "@/components/filter/property-filter-bar";
import PropertyList from "@/components/home/property-list";
import axiosInstance from "@/lib/axios";
import {
  PropertySchemaWithImageAddressCordinates,
  PropertyWithImages,
} from "@/types/property-items";
import React from "react";

const fetchProperties = async (): Promise<PropertyWithImages[]> => {
  try {
    const response = await axiosInstance.get("/property"); // Replace with your API endpoint
    const propertiesData = response.data.data;

    // Validate the data using zod schema
    const result =
      PropertySchemaWithImageAddressCordinates.array().safeParse(
        propertiesData
      );

    if (!result.success) {
      // Detailed error logging
      console.error("Validation failed:");

      // Format and log errors in a readable way
      const errors = result.error.format();
      for (const [index, error] of Object.entries(errors)) {
        console.error(`Error at index ${index}:`);
        if (typeof error === "object") {
          for (const [key, value] of Object.entries(error)) {
            console.error(`  ${key}: ${JSON.stringify(value, null, 2)}`);
          }
        } else {
          console.error(`  ${error}`);
        }
      }

      return []; // Return an empty array if validation fails
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return []; // Return an empty array on error
  }
};
export default async function page() {
  const properties = await fetchProperties();
  return (
    <div className="px-10 flex space-x-5 py-5">
      <FilterBar></FilterBar>
      <section className="px-10">
        {/* <PropertyList properties={properties}></PropertyList> */}
      </section>
    </div>
  );
}
