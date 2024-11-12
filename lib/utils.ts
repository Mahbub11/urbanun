import { SearchLocationSchema } from "@/types/Search.location.type";
import { Property } from "@/types/prisma-data-type";
import { SearchParamsTypes } from "@/types/property-items";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterAndSortProperties = (
  properties: Property[],
  filters: SearchParamsTypes
) => {
  let filteredProperties = properties;

  // Filter based on selected features
  if (filters.features.length > 0) {
    filteredProperties = filteredProperties.filter((property) =>
      filters.features.every((feature) =>
        property.features.some((f) => f.featureName === feature)
      )
    );
  }

  // Filter based on type
  if (filters.type) {
    filteredProperties = filteredProperties.filter(
      (property) => property.type === Number(filters.type)
    );
  }

  // Filter based on category
  if (filters.category) {
    filteredProperties = filteredProperties.filter(
      (property) => property.categoryId === Number(filters.category)
    );
  }

  // Filter based on location
  if (filters.location) {
    filteredProperties = filteredProperties.filter((property) =>
      property.address.includes(filters.location)
    );
  }

  // Filter based on price range
  filteredProperties = filteredProperties.filter((property) => {
    const price = property.price;
    return price >= Number(filters.priceMin) && price <= Number(filters.priceMax);
  });

  // Filter based on bedrooms and bathrooms
  if (filters.bed_rooms) {
    filteredProperties = filteredProperties.filter(
      (property) => property.bed_rooms === Number(filters.bed_rooms)
    );
  }
  if (filters.bath_rooms) {
    filteredProperties = filteredProperties.filter(
      (property) => property.bath_rooms === Number(filters.bath_rooms)
    );
  }

  // Sort properties by price (example sorting, you can customize this logic)
  filteredProperties = filteredProperties.sort((a, b) => a.price - b.price); // Sort by price ascending

  return filteredProperties;
};
