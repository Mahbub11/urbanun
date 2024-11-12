import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getProperty, getPropertyIds } from "./api";
import { PropertyWithImages } from "@/types/property-items";
import axiosInstance from "@/lib/axios";

export function UseGetAllProperty() {
  return useQuery<PropertyWithImages[]>({
    queryKey: ["properties"],
    queryFn: getPropertyIds,
    staleTime: 1000 * 60 * 10, // Optional: Cache for 5 minutes
    refetchOnWindowFocus: true,
  });
}

export function useGetProperty(id: number) {
  return useQuery<PropertyWithImages>({
    queryKey: ["property", { id }],
    queryFn: () => getProperty(id!),
    staleTime: 1000 * 60 * 15, // Optional: Cache for 5 minutes
    refetchOnWindowFocus: true,
  });
}

export function UseGetAllPropertyListing({ filters }: { filters: any }) {
  return useQuery<PropertyWithImages[]>({
    queryKey: ["properties"], // Using filters in query key to refetch on filters change
    queryFn: async () => {
      const { page, limit, ...filterParams } = filters;

      // Prepare query string for the filters
      const queryParams = new URLSearchParams({
        ...filterParams,
        page: page.toString(),
        limit: limit.toString(),
      }).toString();

      // Fetch data from the API
      const res = await (await axiosInstance.get(`/property?${queryParams}`)).data
    
      console.log(res);

      return res;
    },
    staleTime: 1000 * 60 * 10, // Cache the data for 10 minutes
    refetchOnWindowFocus: true, // Refetch on window focus
  });
}