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
import { useQueryFilters } from "@/hooks/usePropertyQueryOnUrl";

export default function AdvancedSearchDialog() {
  const { filters, updateQuryFilters } = useQueryFilters();
  return (
    <div>
      <div className=" px-5 py-5 flex-col space-y-3">
        {/* Type Selection */}
        <Select
          value={filters.type}
          onValueChange={(value) => updateQuryFilters({ type: value })}
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
          onValueChange={(value) => updateQuryFilters({ category: value })}
        >
          <SelectTrigger className="w-full h-[3rem] rounded-none">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Apartments</SelectItem>
            <SelectItem value="1">Condos</SelectItem>
            <SelectItem value="2">Houses</SelectItem>
            <SelectItem value="3">Villa</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Selection */}
        <Select
          value={filters.location}
          onValueChange={(value) => updateQuryFilters({ location: value })}
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
              onChange={(e) => updateQuryFilters({ bed_rooms: e.target.value })}
              className="h-[2.5rem] w-[3rem] border-[1.5px]"
            ></input>
          </div>
          <div className="flex space-x-3">
            <h2 className="self-center">Bath Room:</h2>
            <input
              onChange={(e) =>
                updateQuryFilters({ bath_rooms: e.target.value })
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
                updateQuryFilters({ price: [price[0], price[1]] })
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
              updateQuryFilters({ selectedItems })
            }
          />
        </div>
      </div>
    </div>
  );
}
