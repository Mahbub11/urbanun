import ReviewCarosol from "@/components/review/review-carosol";
import { Building2, FileText, House, KeySquare } from "lucide-react";
import React from "react";

export default function Review() {
  return (
    <div
      className="h-full py-10
    md:px-10 md:w-[80%] sm:w-full sm:px-4 md:py-5 mx-auto font-montreal text-gray-700"
    >
      <h2 className="font-gvf text-[40px] font-[400] leading-tight">
        See what others <br /> said
        <span className="font-[600] text-yellow-500 ml-2">about us</span>
      </h2>

      <div className="mt-[5rem] flex justify-between sm:w-full md:w-[90%] h-full">
        <ReviewCarosol variants={['AA',"BB","C"]}></ReviewCarosol>
      </div>
    </div>
  );
}
