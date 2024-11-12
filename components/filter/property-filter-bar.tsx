"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Search } from "lucide-react";

const FilterBar: React.FC = () => {
  const options = [
    "Air Condition",
    "Cable TV",
    "Ceiling Height",
    "Construction Year",
    "Disabled Access",
    "Elevator",
    "Fence",
    "Fireplace",
    "Floor",
    "Furnishing",
    "Garage",
    "Garden",
    "Heating",
    "Intercom",
    "Parking",
    "Pet Friendly",
    "Renovation",
    "Security",
    "Swimming Pool",
    "WiFi",
    "Window Type",
  ];
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSearch = () => {
    // Handle the search logic here
    console.log("Selected Options:", selectedOptions);
    console.log({ category, location, priceRange });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-[30rem] flex-col">
      <div className="flex flex-col gap-4 mb-4">
        {/* Category Selector */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="w-full"
        />
        <div className="flex space-x-5">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="w-full"
          />

          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="w-full"
          />
        </div>

        {/* Price Range Selector */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            // onChange={(value) => setPriceRange(value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2 grid  mb:grid-cols-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!selectedOptions[option]}
                onChange={() => handleCheckboxChange(option)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="w-full
       flex space-x-2 bg-yellow-500 text-white"
      >
        <Search size={18}></Search> <p className="ml-3">Search Property</p>
      </Button>
    </div>
  );
};

export default FilterBar;
