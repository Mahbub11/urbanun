import { AgentSendMessage } from "@/components/agent/agent-send-message";
import PropertyList from "@/components/home/property-list";
import PropertyCardView from "@/components/property/property-card-view";
import PropertyListingPage from "@/container/property/property-listing-page";
import axiosInstance from "@/lib/axios";
import prisma from "@/lib/prisma";
import { getListingDataSelect } from "@/types/prisma-data-type";
import {
  PropertySchemaWithImageAddressCordinates,
  PropertyWithImages,
} from "@/types/property-items";
import Image from "next/image";
import React from "react";

export default async function page() {
  const rawListings = await prisma.listing.findMany({
    select: getListingDataSelect(), // Assuming this function is defined somewhere
  });

  const data = rawListings.map((listing) => ({
    ...listing,
    images: listing.images.map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl,
      order: image.order,
    })),
    User: {
      id: listing.userId,
      email: listing.user.email,
      avatar: listing.user.avatar,
    },
    coordinates: listing.coordinates ?? {},
  }));

  return (
    <div className="py-10">
      <div>
        <div className="mt-5 -z-50">
          <Image
            className="w-full h-[10rem] md:h-[25rem] object-cover px-5 rounded-md"
            src={"/Images/sign_in_bannar3.jpg"}
            height={200}
            width={1000}
            alt="Video"
          />
        </div>

        <div
          className="mt-3 flex-col md:flex md:flex-row mb:px-3 md:space-x-10
         sm:px-5 md:px-10 z-50"
        >
          <div className="w-full md:w-[50rem]">
            <div
              className=" bg-sky-100 rounded-md
             mt-[-5rem] md:ml-5 shadow-sm py-5 px-5 z-50"
            >
              <div className="flex-col justify-center mt-10">
                <Image
                  className=" rounded-md"
                  src={"/Images/sign_in_bannar3.jpg"}
                  height={300}
                  width={500}
                  alt="Video"
                />

                <div className="mt-10 w-full  ">
                  <div className="flex justify-between">
                    <h2 className="font-medium">Address:</h2>
                    <p> NY 10016, USA</p>
                  </div>
                  <hr className="mt-2"></hr>

                  <div className="flex justify-between">
                    <h2 className="font-medium">Office phone No:</h2>
                    <p>+1234567889</p>
                  </div>
                  <hr className="mt-2"></hr>

                  <div className="flex justify-between">
                    <h2 className="font-medium">Mobile phone:</h2>
                    <p>+1234567899</p>
                  </div>
                  <hr className="mt-2"></hr>

                  <div className="flex justify-between">
                    <h2 className="font-medium">Email:</h2>
                    <p>newhome@qodeinteractive.com</p>
                  </div>
                  <hr className="mt-2"></hr>
                </div>
              </div>
            </div>
            <div className="bg-white px-5 py-5 mb:w-full mt-10">
              <h2 className="text-[25px] font-medium">Feel free to write me</h2>
              <p className="mt-5">
                Save your time and easily rent or sell your property with the
                lowest commission on the real estate
              </p>
              <div className="mt-5">
                <AgentSendMessage></AgentSendMessage>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-10">
              <h2 className="text-[30px] font-bold">Ingrid Vulk</h2>
              <p className="mt-5">
                Lorem ipsum dolor sit amet, pri eu denique concludaturque, qui
                eros utinam luptatum an, sumo nibh tantas in vis. Mel possim
                invenire expetendis ne, ut verear neglegentur mel. Usu cu dictas
                nostrum constituam, eu timeam ceteros delicata nec. In vis
                nostro oporteat, pri ut vide debet aeque, nec invenire
                referrentur eu tantas mentitum. <br></br> <br></br> Ea stet
                ubique primis vis, iuvaret epicuri mea ad. Audiam eripuit sit
                et, est no nibh persius. Viris apeirian praesent ea nec. Nonumy
                ornatus voluptatum qui ex, debet dolorem qualisque est id, nisl
                iuvaret et duo. Purto affert comprehensam vim ea, no per graeco
                epicuri suscipiantur.
              </p>
            </div>
            <hr className="h-2 mt-10"></hr>
            <div className="flex space-x-10 justify-between w-[70%] mt-5">
              <div>
                <h2 className="text-[30px] font-bold">Skills</h2>
                <div className="ml-5 mt-3">
                  <ul className="list-disc space-y-2">
                    <li>Negotiation skills</li>
                    <li>Research skills</li>
                    <li>Local knowledge</li>
                    <li>Time management</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-[30px] font-bold">Experience</h2>
                <div className="ml-5 mt-3">
                  <ul className="list-disc space-y-2">
                    <li>2023 - New Home - Real Estate Agent</li>
                    <li>2022 - Belfort - Real Estate Agent</li>
                    <li>2020 - Hendon - Real Estate Agent</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-[30px] font-bold">Our Listing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-10 mt-10">
                {data.slice(0, 3).map((data, index) => {
                  return (
                    <div key={index}>
                      <PropertyCardView property={data}></PropertyCardView>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
