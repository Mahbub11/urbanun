import { avatar, sectionFiveBannar } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Helper function to generate random phone numbers and emails
const generateRandomPhone = () =>
  `+88${Math.floor(Math.random() * 1000000000)}`;
const generateRandomEmail = () =>
  `agent${Math.floor(Math.random() * 1000)}@gmail.com`;
const generateRandomName = () => `Agent ${Math.floor(Math.random() * 1000)}`;

const agents = Array.from({ length: 10 }, () => ({
  name: generateRandomName(),
  phone: generateRandomPhone(),
  email: generateRandomEmail(),
  avatar: avatar, // Use the same avatar for now, or you can dynamically assign different images
}));

export default function Page() {
  return (
    <div className="pt-[5rem] font-montreal py-10">
      <div className="w-[80%] h-auto mx-auto">
        <h2 className="text-[30px] font-gvf font-[700] text-gray-700 leading-tight">
          Find Best <span className="text-yellow-600">Agents</span> <br />
          For your New Home
        </h2>

        <div className="mt-10 flex flex-wrap gap-10">
          {agents.map((agent, index) => (
            <div key={index} className="opacity-95 h-auto w-[20rem] bg-gray-50">
              <div
                className="w-full h-[23rem] flex justify-center"
                style={{
                  backgroundImage: `url(${"./Images/section_five_bannar.jpg"})`, // Set the background image dynamically
                  backgroundSize: "cover", // Ensure the image covers the entire div
                  backgroundPosition: "center", // Center the image within the div
                  height: "23rem", // Set a fixed height for the div
                }}
              >
                <div
                  className="flex-col items-center 
                backdrop-blur-sm bg-[#f5f8f500] pt-5"
                >
                  <div className="w-full flex justify-center">
                    <Image
                      src={agent.avatar}
                      height={200}
                      width={100}
                      alt="Agent Avatar"
                      className="object-cover self-center h-[5rem] w-[5rem] rounded-full"
                    />
                  </div>
                  <h2 className="uppercase text-[20px] font-gvf text-white font-[700] w-full text-center">
                    {agent.name}
                  </h2>
                  <div className="mx-auto text-center mt-1 text-yellow-400">
                    <h2>{agent.phone}</h2>
                    <h2>{agent.email}</h2>
                  </div>
                  <p className="mt-2 w-[70%] mx-auto text-center text-white">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Officiis, asperiores.
                  </p>

                  <div className="bg-yellow-200 w-[70%] mx-auto overflow-hidden group mt-10">
                    <Link href="/profile/1">
                      <button className="bg-yellow-300 w-full relative px-3 py-2 font-[600] overflow-hidden group">
                        <span className="relative z-10">View Listing</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
