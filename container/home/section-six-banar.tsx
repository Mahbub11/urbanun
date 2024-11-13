"use client";
import { homeLoan, sectionThreeBannar } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function SectionSixBannar() {
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
    <div className="md:px-5  font-montreal text-gray-700">
      <div className={`w-full md:py-10 bg-[#EDF9F9]`}>
        <div
          className="sm:w-full md:w-[70%] sm:px-5 py-[5rem] mx-auto"
          ref={sectionRef}
        >
          <div
            className="w-full flex sm:flex-col justify-center
           md:space-x-[5rem] items-center"
          >
            <div className="md:h-[25rem] md:w-[50rem] relative md:block">
              {/* Yellow background div */}
              <div
                className={`absolute sm:hidden rounded-sm w-full h-full bg-yellow-400 md:mt-10 ml-[-1rem] transform transition-all duration-1200 ${
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
                  className="rounded-sm w-full md:h-[25rem] object-cover md:mt-10 sm:mt-5 shadow-sm"
                  src={homeLoan}
                  height={300}
                  width={400}
                />
              </div>
            </div>

            {/* Text content */}
            <div className="font-[450] items-center sm:mt-10">
              <div className="w-full sm:flex-1 md:w-[80%]">
                <h2
                  className="font-gvf text-[40px] font-[500] 
                tracking-tight leading-tight"
                >
                  Explore your home <br></br>{" "}
                  <span className="text-yellow-400">loan options</span>
                </h2>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix
                  primis viderere vituperatoribus. In corpora argumentum. Vix
                  ferri dicam contentiones ne, ex appetere salutatus
                </p>

                <div className="mt-5">
                  <Link
                    href={"/property"}
                    className="bg-[#A9DE74]  w-fit
                   sm:w-full overflow-hidden group "
                  >
                    <button
                      className="bg-[#A9DE74]  sm:w-full
                     relative px-5 py-3 font-[600]
                   overflow-hidden group"
                    >
                      <span className="relative z-10">Search Property</span>
                      {/* Pseudo-element for filling effect */}
                      <span
                        className="absolute inset-0 bg-[#8ACE46] group-hover:w-full 
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
