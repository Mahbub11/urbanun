import { renovationOne, renovationThree, renovationTwo } from "@/public";
import {
  Building2,
  FileText,
  HomeIcon,
  House,
  KeySquare,
  LayoutList,
  PaintRoller,
  Pyramid,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export default function MakeRenovation() {
  return (
    <div
      className="sm:px-4 py-10
    md:px-10 md:w-[70%] sm:w-full md:py-5 mx-auto font-montreal text-gray-700"
    >
      <div className="mt-[5rem] flex items-start w-full space-x-[5rem] ">
        <div>
          <h2 className="font-gvf sm:text-[30px] text-[40px] font-[500] leading-tight">
            Our expert will help you <br></br> make the
            <span className="text-yellow-400 font-[600] ml-2">renovation</span>
          </h2>
          <div className="flex-col space-y-8 mt-10">
            <div className="flex space-x-8 ">
              <Pyramid
                className="mt-[-.5rem]"
                strokeWidth="1px"
                size={80}
              ></Pyramid>
              <div>
                <h2 className="font-gvf text-[25px] font-[500]">
                  Find inspiration
                </h2>
                <p className="">
                  Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                  graeco quod suavitate vix ad praesent.
                </p>
              </div>
            </div>

            <div className="flex space-x-8">
              <LayoutList
                className="mt-[-.5rem]"
                strokeWidth="1px"
                size={80}
              ></LayoutList>
              <div>
                <h2 className="font-gvf text-[25px] font-[500]">
                  Find inspiration
                </h2>
                <p className="">
                  Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                  graeco quod suavitate vix ad praesent.
                </p>
              </div>
            </div>

            <div className="flex space-x-8">
              <PaintRoller
                className="mt-[-.5rem]"
                strokeWidth="1px"
                size={80}
              ></PaintRoller>
              <div>
                <h2 className="font-gvf text-[25px] font-[500]">
                  Find inspiration
                </h2>
                <p className="">
                  Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                  graeco quod suavitate vix ad praesent.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[60%] mt-10 sm:hidden md:block flex space-x-5">
          <div className="h-auto w-full flex space-x-5">
            <Image
              src={renovationOne}
              height={200}
              width={300}
              className="h-auto w-auto rounded-sm"
              alt="sdf"
            ></Image>

            <div className="flex-col space-y-2">
              <Image
                src={renovationTwo}
                height={500}
                width={300}
                className="h-[15rem] w-[20rem] rounded-sm"
                alt="sdf"
              ></Image>
              <Image
                src={renovationThree}
                height={200}
                width={300}
                className="h-[15rem] w-auto rounded-sm"
                alt="sdf"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
