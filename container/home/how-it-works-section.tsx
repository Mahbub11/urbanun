import { Building2, FileText, House, KeySquare } from "lucide-react";
import React from "react";

export default function HowItWorks() {
  return (
    <div className="h-auto py-10 sm:py-5 sm:px-4
    md:px-10 md:w-[80%] sm:w-full md:py-5 mx-auto font-montreal text-gray-700">
      <h2 className="font-gvf text-[40px] font-[400] leading-tight">
        How it works? <br /> Find a
        <span className="font-[600] text-yellow-500 ml-2">Perfect Home</span>
      </h2>
      
      <div className="mt-[5rem] sm:flex-col flex sm:flex-wrap
      sm:items-center justify-between sm:border-none">
        {/* Each step with a separator between them */}
        <div className="flex flex-col items-center px-5 border-r
         border-gray-300 last:border-none sm:border-none">
          <Building2 strokeWidth="1px" size={80} />
          <h2 className="text-[30px] font-gvf mt-2 text-center">Find real estate</h2>
          <p className="font-montreal text-[15px] text-center">
            Sumo petentium ut per, at his wisim utinam adipiscing. Est ei
            graeco quod suavitate vix.
          </p>
        </div>

        <div className="flex flex-col items-center px-5 border-r border-gray-300
         last:border-none sm:border-none">
          <House strokeWidth="1px" size={80} />
          <h2 className="text-[30px] font-gvf mt-2 text-center">Find real estate</h2>
          <p className="font-montreal text-[15px] text-center">
            Sumo petentium ut per, at his wisim utinam adipiscing. Est ei
            graeco quod suavitate vix.
          </p>
        </div>

        <div className="flex flex-col items-center px-5 border-r border-gray-300
        sm:border-none last:border-none">
          <FileText strokeWidth="1px" size={80} />
          <h2 className="text-[30px] font-gvf mt-2 text-center">Find real estate</h2>
          <p className="font-montreal text-[15px] text-center">
            Sumo petentium ut per, at his wisim utinam adipiscing. Est ei
            graeco quod suavitate vix.
          </p>
        </div>

        <div className="flex flex-col items-center px-5 last:border-none
        sm:border-none">
          <KeySquare strokeWidth="1px" size={80} />
          <h2 className="text-[30px] font-gvf mt-2 text-center">Find real estate</h2>
          <p className="font-montreal text-[15px] text-center">
            Sumo petentium ut per, at his wisim utinam adipiscing. Est ei
            graeco quod suavitate vix.
          </p>
        </div>
      </div>
    </div>
  );
}
