"use client";
import { sectionFiveBannar, sectionThreeBannar } from "@/public";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export default function SectionNewsLatter() {
  return (
    <div className="md:px-5 font-montreal text-gray-800 ">
      <div
        className="opacity-95 object-cover`"
        style={{
          backgroundImage: `url(${"./Images/find_home.jpg"})`, // Set the background image dynamically
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the image within the div
          height: "38rem", // Set a fixed height for the div
        }}
      >
        <div
          className="md:w-[95%] lg:w-[80%] mx-auto h-full flex 
          w-full sm:flex-col lg:space-x-[2rem] items-center
          "
        >
          <div className="md:w-[50%] sm:text-center sm:mt-5">
            <h2
              className="font-gvf sm:text-[40px] md:text-[45px] text-[65px] text-white 
              font-[700] leading-tight tracking-tight"
            >
              Discover a new<br></br> way of living
            </h2>
            <p className="text-[15px] text-white md:w-[60%] mt-5 sm:text-center">
              * Feugait scriptorem qui ea, quo admodum eloquentiam eu. Te malis
              tibique eum. Ne magna assum everti.
            </p>
          </div>

          <div
            className="md:flex-1 md:w-[50%] sm:w-[95%] sm:px-4 
            md:py-10 backdrop-blur-sm bg-[#f5f8f59e] 
             md:ml-[-2rem] sm:mt-10 sm:py-5"
          >
            <div className="md:px-10 py-5 sm:h-auto sm:w-full">
              <h2
                className="font-gvf text-[35px] font-[600]
              "
              >
                Sign to newsletter
              </h2>
              <p className=" mt-2  mx-auto">
                Save your time and easily rent or sell your property with the
                lowest commission on the real estate market.
              </p>

              <div
                className="mt-10 w-full sm:h-full sm:flex-col
               sm:space-y-2 flex "
              >
                <input
                  placeholder="Your Email "
                  className="px-5 md:flex-1 md:h-[3rem] sm:h-[3rem]"
                ></input>

                <div className="flex-1 sm:w-full overflow-hidden group">
                  <button
                    className="bg-yellow-300 sm:w-full relative px-3 py-3 font-[600]
                   overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    {/* Pseudo-element for filling effect */}
                    <span
                      className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-[1500ms] w-0"
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
