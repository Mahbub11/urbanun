import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // new from next/navigation
import { useQueryClient } from "@tanstack/react-query";
import { Property } from "@/types/prisma-data-type";

// Utility function to create query params from filter state
const createQueryParams = (filters: any): string => {
  const queryParams = new URLSearchParams();

  if (filters.selectedItems.length > 0) {
    queryParams.set("features", filters.selectedItems.join(","));
  }
  if (filters.type) queryParams.set("type", filters.type);
  if (filters.category) queryParams.set("category", filters.category);
  if (filters.location) queryParams.set("location", filters.location);
  queryParams.set("priceMin", filters.price[0].toString());
  queryParams.set("priceMax", filters.price[1].toString());

  return queryParams.toString(); // This returns the query string format
};

export const useFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<{
    selectedItems: string[];
    type: string;
    category: string;
    location: string;
    price: [number, number];
    bed_rooms: string;
    bath_rooms: string;
  }>({
    selectedItems: [],
    type: "",
    category: "",
    location: "",
    price: [100, 50000],
    bed_rooms: "",
    bath_rooms: "",
  });

  useEffect(() => {
    // Sync filters state with the URL query params on initial load or URL change
    const features = searchParams.getAll("features");
    const type = searchParams.get("type") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const priceMin = searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : 10;
    const priceMax = searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : 500000;

    setFilters({
      selectedItems: features || [],
      type,
      category,
      location,
      price: [priceMin, priceMax],
      bed_rooms: "",
      bath_rooms: "",
    });
  }, [searchParams]);

  // Function to update filters and update URL
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      const queryString = createQueryParams(updatedFilters);
      const newUrl = `${pathname}?${queryString}`;
      window.history.pushState({}, "", newUrl); // Update the URL
      return updatedFilters;
    });
  };

  // Fetch cached properties
  const queryClient = useQueryClient();
  const cachedProperties = queryClient.getQueryData<Property[]>(['properties']) || [];

  // Function to filter and sort the cached properties based on the current filters
  const filterAndSortProperties = (properties: Property[]) => {
    let filteredProperties = properties;

    // Filter based on selected features
    if (filters.selectedItems.length > 0) {
      filteredProperties = filteredProperties.filter(property =>
        filters.selectedItems.every(feature => property.features.some(f => f.featureName === feature))
      );
    }

    // Filter based on type
    if (filters.type) {
      filteredProperties = filteredProperties.filter(property => property.type === Number(filters.type));
    }

    // Filter based on category
    if (filters.category) {
      filteredProperties = filteredProperties.filter(property => property.categoryId === Number(filters.category));
    }

    // Filter based on location
    if (filters.location) {
      filteredProperties = filteredProperties.filter(property => property.address.includes(filters.location));
    }

    // Filter based on price range
    filteredProperties = filteredProperties.filter(property => {
      const price = property.price;
      return price >= filters.price[0] && price <= filters.price[1];
    });

    // Filter based on bedrooms and bathrooms
    if (filters.bed_rooms) {
      filteredProperties = filteredProperties.filter(property => property.bed_rooms === Number(filters.bed_rooms));
    }
    if (filters.bath_rooms) {
      filteredProperties = filteredProperties.filter(property => property.bath_rooms === Number(filters.bath_rooms));
    }

    // Sort properties by price (example sorting, you can customize this logic)
    filteredProperties = filteredProperties.sort((a, b) => a.price - b.price); // Sort by price ascending

    return filteredProperties;
  };

  // Get filtered and sorted properties
  const filteredProperties = filterAndSortProperties(cachedProperties);

  // Only set loading to false once filtered properties are available and the component mounts
  useEffect(() => {
    if (filteredProperties.length > 0) {
      setLoading(false);
    }
  }, [filteredProperties]);

  return {
    filters,
    updateFilters,
    loading,
    filteredProperties, // Return filtered and sorted properties
  };
};
