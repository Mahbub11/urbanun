"use client";
import HeroImageCarosol from "@/components/hero/image-carosol";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryFilters } from "@/hooks/usePropertyQueryOnUrl";
import { PropertyImages } from "@/types/prisma-data-type";
import { SearchIcon, Settings2 } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropertyFeatureCheckbox } from "@/components/checkbox/multiple-checkbox-holder";
import AdvancedSearchDialog from "./dialog-container/advanced-search-dialog";
import { usePathname, useRouter } from "next/navigation";

export default function HomeHero() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { filters, updateQuryFilters } = useQueryFilters();
  const propertyImages: PropertyImages[] = Array.from(
    { length: 10 },
    (_, index) => ({
      id: index + 1, // Assign an ID starting from 1
      url: `https://picsum.photos/1200/675?v=${index}`, // Generate the URL dynamically
      altText: `Image description for image ${index + 1}`, // Sample alt text
    })
  );

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
  };

  const handleSearch = () => {
    const currentUrl = window.location.href;
    router.push(currentUrl);
  };

  return (
    <div className="relative font-montreal  md:px-10">
      <HeroImageCarosol variants={propertyImages}></HeroImageCarosol>

      <div
        className="absolute w-full sm:px-5 lg2:px-[5rem] lg:px-[2rem]
      xl:px-[10rem] sm:top-10  bottom-[15%] left-1/2 transform -translate-x-1/2"
      >
        <div className="w-full md:px-10">
          <h2
            className="w-full font-montreal sm:text-[45px] md:text-[50px] lg:text-[60px]
            xl:text-[80px] tracking-wider leading-[1]
          font-[800] text-white "
          >
            Buy or rent properties <br></br>
            with no commission
          </h2>

          <div className="mt-5">
            <div className="h-10 px-5
             rounded-t-md w-[20rem] text-[14px] font-montreal
              flex space-x-[1px] md:ml-10">
              <button
                className={`w-full px-1 py-2 rounded-t-md bg-[#f5f8f59e] backdrop-blur-md
                 hover:bg-white/80 ${filters.type === "0" ? "bg-white" : ""}`}
                onClick={() => updateQuryFilters({ type: "0" })}
              >
                Buy
              </button>

              <button
                className={`w-full px-1 py-2 rounded-t-md bg-[#f5f8f59e]
                 backdrop-blur-md hover:bg-white/80 ${
                   filters.type === "1" ? "bg-white" : ""
                 }`}
                onClick={() => updateQuryFilters({ type: "1" })}
              >
                For Rent
              </button>

              <button
                className={`w-full px-1 py-2 rounded-t-md bg-[#f5f8f59e]
                 backdrop-blur-md hover:bg-white/80 ${
                   filters.type === "2" ? "bg-white" : ""
                 }`}
                onClick={() => updateQuryFilters({ type: "2" })}
              >
                Sell
              </button>
            </div>
            <div
              className="w-full sm:h-full sm:py-5 h-[8rem] bg-[#f5f8f59e] 
             backdrop-blur-md rounded-md"
            >
              <div
                className="flex sm:flex-col sm:space-y-3 md:space-x-5 items-center w-full 
              h-full px-10 font-montreal font-[400]"
              >
                <div className="md:flex-1 lg:flex-auto lg:w-[65%] 
                sm:w-full flex sm:flex-col sm:mt-5 sm:space-y-2 justify-between lg:space-x-5 ">
                  <div className="flex-1">
                    <Select
                      value={filters.category}
                      onValueChange={(value) =>
                        updateQuryFilters({ category: value })
                      }
                    >
                      <SelectTrigger className="w-full h-[3rem] rounded-none">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="0">Apartments</SelectItem>
                        <SelectItem value="1">Condos</SelectItem>
                        <SelectItem value="2">Houses</SelectItem>
                        <SelectItem value="3">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select
                      value={filters.location}
                      onValueChange={(value) =>
                        updateQuryFilters({ location: value })
                      }
                    >
                      <SelectTrigger className="w-full h-[3rem] rounded-none">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brooklyn">Brooklyn</SelectItem>
                        <SelectItem value="mahattan">Manhattan</SelectItem>
                        <SelectItem value="queens">Queens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="md:flex-1 lg:flex-auto sm:w-full lg:w-[35%] 
                sm:flex-col sm:space-y-2 flex md:space-x-5 justify-between">
                  <div className="bg-yellow-200 w-full overflow-hidden group">
                    <button
                      onClick={() => setOpenDialog(true)}
                      className="bg-yellow-300 w-full relative  py-3 font-[600]
                   overflow-hidden group"
                    >
                      <span className="relative z-10 flex space-x-3 justify-center">
                        <Settings2 strokeWidth="1.5px"></Settings2>
                        <p>Advanced</p>
                      </span>
                      {/* Pseudo-element for filling effect */}
                      <span
                        className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-300 w-0"
                      ></span>
                    </button>
                  </div>

                  <div className="bg-yellow-200 w-full overflow-hidden group">
                    <button
                      onClick={handleSearch}
                      className="bg-yellow-300 w-full relative  py-3 font-[600]
                   overflow-hidden group"
                    >
                      <span className="relative z-10 flex space-x-3 justify-center">
                        <SearchIcon
                          size={20}
                          className="mt-[2px]"
                          strokeWidth="1.5px"
                        ></SearchIcon>
                        <p className="">Search property</p>
                      </span>
                      {/* Pseudo-element for filling effect */}
                      <span
                        className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-300 w-0"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={openDialog} onOpenChange={handleOpenChange}>
          <DialogContent className="">
            <AdvancedSearchDialog></AdvancedSearchDialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// h-[30rem] md:w-[45rem] lg:w-[75rem] lg2:w-[90rem]
//          md:px-10 lg:px-[10rem]
//         xl:px-[8rem]
