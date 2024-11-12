"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "@/components/slidebar/dualrangesidebar";
import { PropertyFeatureCheckbox } from "@/components/checkbox/multiple-checkbox-holder";
import { SearchIcon } from "lucide-react";
import PropertyList from "@/components/home/property-list";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Property } from "@/types/prisma-data-type";
import { useFilters } from "@/hooks/usePropertySearchFilter";
import PropertyCardView from "@/components/property/property-card-view";
import { useQuery } from "react-query";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  UseGetAllProperty,
  UseGetAllPropertyListing,
} from "@/app/services/property/queries";

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyListingPage({ properties }: PropertyListProps) {
  const queryClient = useQueryClient();
  queryClient.setQueryData(["properties"], properties);

  const { filters, updateFilters, filteredProperties } = useFilters();
  const [page, setPage] = useState(1);
  const limit = 6; // Set limit to 6 per page

  const totalPages = Math.ceil(filteredProperties.length / limit); // Calculate total pages

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage); // Only set the page if it's valid
    }
  };
  // Slice the filteredProperties array to only show the current page's items
  const currentProperties = filteredProperties.slice(
    (page - 1) * limit,
    page * limit
  );

  console.log(properties);

  const handleSearchProperty = () => {
    console.log(filters);
    // Logic to fetch properties based on filters (this can be extended if needed)
  };

  useEffect(() => {
    // Reset to page 1 when filters change (optional)
    setPage(1);
  }, [filters]);
  console.log(page);

  return (
    <section className="w-full h-full bg-white font-montreal text-gray-700">
      <div className="flex sm:flex-col sm:space-y-5 space-x-3">
        <div className="w-auto py-5 h-auto bg-[#fbfbfb]">
          <div className="px-5 py-5 flex-col space-y-3">
            {/* Type Selection */}
            <Select
              value={filters.type}
              onValueChange={(value) => updateFilters({ type: value })}
            >
              <SelectTrigger className="w-full h-[3rem] rounded-none select-none outline-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Buy</SelectItem>
                <SelectItem value="1">For Rent</SelectItem>
                <SelectItem value="2">Sell</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Selection */}
            <Select
              value={filters.category}
              onValueChange={(value) => updateFilters({ category: value })}
            >
              <SelectTrigger className="w-full h-[3rem] rounded-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Apartments</SelectItem>
                <SelectItem value="2">Condos</SelectItem>
                <SelectItem value="3">Houses</SelectItem>
                <SelectItem value="0">Villa</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Selection */}
            <Select
              value={filters.location}
              onValueChange={(value) => updateFilters({ location: value })}
            >
              <SelectTrigger className="w-full h-[3rem] rounded-none">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Brooklyn</SelectItem>
                <SelectItem value="dark">Manhattan</SelectItem>
                <SelectItem value="system">Queens</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex space-x-4 items-center justify-center py-3">
              <div className="flex space-x-3">
                <h2 className="self-center">Bed Room:</h2>
                <input
                  onChange={(e) => updateFilters({ bed_rooms: e.target.value })}
                  className="h-[2.5rem] w-[3rem] border-[1.5px]"
                ></input>
              </div>
              <div className="flex space-x-3">
                <h2 className="self-center">Bath Room:</h2>
                <input
                  onChange={(e) =>
                    updateFilters({ bath_rooms: e.target.value })
                  }
                  className="h-[2.5rem] w-[3rem] border-[1.5px]"
                ></input>
              </div>
            </div>

            {/* Price range sliders */}
            <div className="mt-5">
              <div className="flex justify-between">
                <h2>Price range</h2>
                <h2>
                  From: {filters.price[0]}$ To: {filters.price[1]}$
                </h2>
              </div>
              <div className="mt-5">
                <DualRangeSlider
                  defaultValue={filters.price}
                  label={(value) => <span>{value}℃</span>}
                  value={filters.price}
                  onValueChange={(price) =>
                    updateFilters({ price: [price[0], price[1]] })
                  }
                  min={100}
                  max={100000}
                  step={100}
                />
              </div>
            </div>

            {/* Property Feature Selection */}
            <div className="mt-5">
              <PropertyFeatureCheckbox
                onFormDataChange={(selectedItems) =>
                  updateFilters({ selectedItems })
                }
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full mx-auto flex justify-center px-5">
            <div className="bg-yellow-200 w-full overflow-hidden group">
              <button
                onClick={handleSearchProperty}
                className="bg-yellow-300 w-full relative px-3 py-3 font-[600] overflow-hidden group"
              >
                <div className="flex space-x-3 justify-center">
                  <SearchIcon className="z-10 mt-[2px]" size={20} />
                  <span className="relative z-10">Search Property</span>
                </div>
                <span className="absolute inset-0 bg-yellow-400 group-hover:w-full transition-all duration-500 w-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Property List */}
        <div className="flex-1 h-auto">
          <div className="h-auto w-full relative">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-x-2 gap-y-10">
              {currentProperties.length > 0 ? (
                currentProperties.map((data, index) => (
                  <div key={index}>
                    <PropertyCardView property={data} />
                  </div>
                ))
              ) : (
                <div
                  className="w-full h-full absolute
                 md:top-1/2 left-1/2 transform -translate-x-1/2 
                 -translate-y-1/2 flex justify-center items-center"
                >
                  <h2 className="text-[30px] sm:py-10 md:mt-[10rem]">No Property Found!</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10">
        <Pagination className="space-x-5">
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePageChange(page - 1)}
            aria-disabled={page === 1}
          >
            Previous
          </PaginationPrevious>

          {/* Page Numbers */}
          <PaginationItem className="bg-transparent">
            <PaginationLink>
              Page {page} of {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationNext
            className="cursor-pointer"
            onClick={() => handlePageChange(page + 1)}
            aria-disabled={page === totalPages}
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </section>
  );
}
