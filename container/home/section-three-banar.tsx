"use client";
import { sectionThreeBannar } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function SectionThreeBannar() {
  const [inView, setInView] = useState(false); // State to track if the component is in the viewport
  const [hasTransited, setHasTransited] = useState(false); // State to track if transition has happened
  const sectionRef = useRef<HTMLDivElement>(null); // Reference for the section

  // Intersection Observer callback
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    // Check if the component is in the center of the viewport
    if (entry.isIntersecting) {
      setInView(true);
      if (!hasTransited) {
        // Trigger transition once
        setHasTransited(true);
      }
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // The viewport is the root
      threshold: 1, // Trigger when 100% of the component is in the viewport
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasTransited]);

  return (
    <div className="md:px-5 font-montreal text-gray-700">
      <div className={`w-full md:py-10 bg-[#EDF9F9]`}>
        <div
          className="w-full  md:w-[90%] lg:w-[70%] sm:py-5
         md:py-[5rem] mx-auto sm:pt-3 "
          ref={sectionRef}
        >
          <div
            className="w-full h-full sm:flex-col
           md:flex justify-center md:space-x-[5rem] sm:space-y-[3rem]
           sm:justify-center items-center sm:ml-2"
          >
            <div
              className="md:h-[25rem] md:w-[50rem]
             relative sm:w-[22rem] h-[15rem] "
            >
              {/* Yellow background div */}
              <div
                className={`absolute sm:hidden rounded-sm w-full h-full sm:h-[12rem] bg-yellow-400 mt-10
                 md:ml-[-1rem] transform transition-all duration-1200 ${
                   hasTransited
                     ? "translate-x-0 translate-y-[13px]" // Position once transition has happened
                     : inView
                     ? "translate-x-0 translate-y-[13px]" // Transition while in view
                     : "translate-x-[16px] translate-y-0" // Initial state when out of view
                 }`}
              ></div>

              {/* Image */}
              <div className="relative z-10">
                <Image
                  alt="kkk"
                  className="rounded-sm w-full h-full
                   md:h-[25rem] object-cover mt-10 shadow-sm"
                  src={sectionThreeBannar}
                  height={300}
                  width={400}
                />
              </div>
            </div>

            {/* Text content */}
            <div className="font-[450] sm:ml-4 w-[80%]">
              <div className="">
                <h2
                  className="font-gvf sm:text-[30px] md:text-[30px] 
                lg:text-[40px] font-[500] md:mt-[1rem] tracking-tight leading-tight"
                >
                  Modern spaces and <br />{" "}
                  <span className="font-[600]">premium</span> design
                </h2>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix
                  primis viderere vituperatoribus. In corpora argumentum.
                </p>

                <div className="mt-5">
                  <p>- lorem ipsum dolor sit amt</p>
                  <p>- lorem ipsum dolor sit amt</p>
                  <p>- lorem ipsum dolor sit amt</p>
                  <p>- lorem ipsum dolor sit amt</p>
                </div>

                <div className="mt-5">
                  <Link
                    href={"/property"}
                    className="bg-yellow-200 w-fit
                   sm:w-full overflow-hidden group "
                  >
                    <button
                      className="bg-yellow-300 sm:w-full
                     relative px-5 py-3 font-[600]
                   overflow-hidden group"
                    >
                      <span className="relative z-10">Search Property</span>
                      {/* Pseudo-element for filling effect */}
                      <span
                        className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-[1500ms] w-0"
                      ></span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
