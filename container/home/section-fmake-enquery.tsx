"use client";
import { sectionFiveBannar, sectionThreeBannar } from "@/public";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export default function SectionFiveBannar() {
  return (
    <div className="md:px-5 px-2 font-montreal text-gray-800 ">
      <div
        className="opacity-95 "
        style={{
          backgroundImage: `url(${"./Images/section_five_bannar.jpg"})`, // Set the background image dynamically
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the image within the div
          height: "40rem", // Set a fixed height for the div
        }}
      >
        <div
          className="w-full h-full 
          sm:px-3 sm:py-5 flex justify-center md:space-x-[2rem] items-center
          "
        >
          <div className="self-center sm:hidden md:block">
            <h2
              className="font-gvf sm:text-[30px] text-[65px] text-white 
              font-[700] leading-tight tracking-tight"
            >
              Discover a new<br></br> way of living
            </h2>
            <p className="text-[15px] text-white w-[60%] mt-5">
              * Feugait scriptorem qui ea, quo admodum eloquentiam eu. Te malis
              tibique eum. Ne magna assum everti.
            </p>
          </div>

          <div
            className="h-[30rem] sm:h-[35rem] sm:absolute  backdrop-blur-sm bg-[#f5f8f59e] 
           md:w-[35rem]  sm:w-[90%] self-center sm:px-5 md:ml-[-2rem] "
          >
            <div className="md:px-10 sm:px-3 py-5 ">
              <h2
                className="font-gvf text-[35px]  font-[600]
              "
              >
                Make an enquiry
              </h2>
              <p className=" mt-2  mx-auto">
                Save your time and easily rent or sell your property with the
                lowest commission on the real estate market.
              </p>

              <div className="mt-5 flex-col space-y-5">
                <input
                  className="h-[3.5rem] rounded-sm w-full px-3 py-3"
                  placeholder="Your Name"
                ></input>
                <input
                  className="h-[3.5rem] rounded-sm w-full px-3 py-3"
                  placeholder="Your Email"
                ></input>
                <input
                  className="h-[3.5rem] rounded-sm w-full px-3 py-3"
                  placeholder="Your Phone Number"
                ></input>

                <div className="bg-yellow-200 w-fit sm:w-full overflow-hidden group">
                  <button
                    className="bg-yellow-300 sm:w-full relative px-3 py-3 font-[600]
                   overflow-hidden group"
                  >
                    <span className="relative z-10">Make an enquiry</span>
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
