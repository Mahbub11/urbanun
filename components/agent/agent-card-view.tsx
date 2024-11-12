"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserData } from "@/types/prisma-data-type";

export default function AgentCardView({ user }: { user: UserData }) {
  return (
    <div>
      <div className="px-5 py-5 w-full bg-sky-100 rounded-md">
        <div className=" flex justify-start space-x-5">
          <div>
            <Image
              className="rounded-md shadow-sm h-[5rem] w-[5rem] object-cover"
              src={user.avatar!}
              alt="Agnet pp"
              height={100}
              width={100}
            ></Image>
          </div>

          <div className="">
            <h2>New Home</h2>
            <h2>{user.name}</h2>
            <h2 className="font-medium">{""}</h2>
            <h2>560 3rd Ave, New York, NY 10016, USA</h2>
          </div>
        </div>

        <div className="mt-10 w-[90%] ml-2">
          <div className="flex justify-between">
            <h2 className="font-medium">Phone Number</h2>
            <p>01324444444</p>
          </div>
          <hr className="mt-2"></hr>

          <div className="flex justify-between">
            <h2 className="font-medium">Email</h2>
            <p>{user.email}</p>
          </div>
          <hr className="mt-2"></hr>

          <div className="flex justify-between">
            <h2 className="font-medium">WhatsApp</h2>
            <p>01324444444</p>
          </div>
          <hr className="mt-2"></hr>
        </div>

        <div className="bg-yellow-200 w-full overflow-hidden group mt-3">
          <button
            className="bg-yellow-300 w-full relative px-3 py-2 font-[600]
                   overflow-hidden group"
          >
            <h2 className="relative z-10 tracking-wide">View My Listing</h2>
            {/* Pseudo-element for filling effect */}
            <span
              className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-500 w-0"
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}
