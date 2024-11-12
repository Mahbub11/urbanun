import AgentCardView from "@/components/agent/agent-card-view";
// import PropertyListCard from "@/components/home/property-card";
import GoogleMapSection from "@/components/maps/googleMapSection";
import PropertyCardView from "@/components/property/property-card-view";
import RatingStar from "@/components/rating/rating";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PropertyCommentHolder } from "@/components/view-property/comment-on-property";
import PropertyImageCarosol from "@/components/view-property/image-carosol";
import ImageSlider from "@/components/view-property/image-slider";
import { PropertyEnqueryForm } from "@/components/view-property/property-enquery-form";
import { FloorPlanTabs } from "@/container/view-property/floor-plan-container";
import PropertyFeatures from "@/container/view-property/property-features";
import { ImageSchema } from "@/types/image-schema";
import { PropertyImage, getListingDataSelect } from "@/types/prisma-data-type";
import { PropertySchemaWithImageAddressCordinates } from "@/types/property-items";
import prisma from "@/utils/prisma/client";

import {
  Bath,
  BedDouble,
  Building,
  Eye,
  HeaterIcon,
  ParkingCircle,
  Plus,
  Printer,
  ShareIcon,
  StarIcon,
  SwitchCameraIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface Coordinates {
  lat: number;
  lng: number;
} 

export default async function Page({ params }: { params: { id: string } }) {
  const parseData = parseInt(params.id);

  const property = await prisma.listing.findUnique({
    select: getListingDataSelect(),
    where: {
      id: parseData,
    },
  });
  if (!property) {
    return <div>Loadig.......</div>;
  }

  const imageUrls = property?.images.map((image: PropertyImage) => ({
    id: image.id,
    url: image.imageUrl,
    altText: image.imageUrl,
  })) || [{}];

  const property_details = property.features.filter(
    (feature) => feature.type === 0
  );
  const property_utility = property.features.filter(
    (feature) => feature.type === 1
  );
  const property_features = property.features.filter(
    (feature) => feature.type === 2
  );
  const property_nearby = property.features.filter(
    (feature) => feature.type === 3
  );

  console.log(property_details);

  return (
    <div
      className="w-full md:w-full 
     lg:w-[90%] mx-auto md:px-5 lg:px-8 lg:py-10 text-gray-700 px-3 py-10"
    >
      <div className="w-full mx-auto flex justify-center ">
        <PropertyImageCarosol variants={imageUrls}></PropertyImageCarosol>
        {/* <ImageSlider option={{ loop: true }} slides={imageUrls}></ImageSlider> */}
      </div>

      <div
        className="md:flex md:flex-row
       sm:flex-col md:space-x-[5rem] lg:px-[5rem] font-montreal"
      >
        <div className="mt-10 flex-1">
          <span className="bg-slate-200 rounded-md px-3 py-1">
            {property.type === 0 ? "Sell" : property.type === 1 ? "Rent" : ""}
          </span>
          <h2 className="sm:text-[25px] md:text-[35px] mt-2 font-gvf font-bold">
            {property.title}
          </h2>
          <div className=" flex space-x-2 h-4 text-[15px] font-montreal mt-1">
            <h2 className="uppercase"> {property.category.name}</h2>
            <Separator
              className="h-4 w-[3px] mt-1 items-center"
              orientation="vertical"
            />
            <h2>PROPERTY ID: {`P${property.id}C${property.categoryId}`}</h2>
            <Separator
              className="h-4 w-[3px] mt-1 items-center"
              orientation="vertical"
            />
            <div className="flex space-x-1 items-center mt-2">
              <Eye size={20} />
              <p>4434</p>
            </div>

            <RatingStar />
          </div>

          <div className="mt-10">
            <h2 className="text-[30px] font-gvf font-bold">Descriptions</h2>
            <p className="tracking-wide leading-6 text-[15px]">
              {property.description}
            </p>
          </div>
          <hr className="mt-5 h-3" />

          <div className="mt-5">
            <PropertyFeatures
              details={property_details}
              utility={property_utility}
              features={property_features}
            ></PropertyFeatures>
          </div>

          <hr className="mt-10" />

          <div className="mt-5">
            <h2 className="text-[23px] font-gvf font-[500]">Video</h2>
            <Image
              className="rounded-md mt-5"
              src={"/Images/sign_in_bannar1.jpg"}
              height={700}
              width={1000}
              alt="Video"
            />
          </div>

          <hr className="mt-10" />
          <div className="mt-5">
            <h2 className="text-[23px] font-gvf font-[500]">Floor Plans</h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, homero debitis temporibus in mei, at
              sit voluptua antiopam hendrerit. Lorem epicuri eu per. Mediocrem
              torquatos deseruisse te eum commodo.
            </p>
            <div>
              <FloorPlanTabs property={property.floor_plans}></FloorPlanTabs>
            </div>
          </div>

          <hr className="mt-10" />

          <div className="mt-5">
            <h2 className="text-[23px] font-gvf font-[500]">Location</h2>
            <div>
              <h2>{property.address}</h2>
              <div className="mt-5 rounded-md border-[1px] border-gray-400">
                <GoogleMapSection
                  title={property.title!}
                  coordinates={{
                    lat: 23.8041,
                    lng: 90.4152,
                  }}
                ></GoogleMapSection>
              </div>
            </div>
          </div>
          <hr className="mt-10" />
          <div className="mt-5">
            <h2 className="text-[23px] font-gvf font-[500]">What's nearby?</h2>
            <p className="text-[18px]">
              Lorem ipsum dolor sit amet, homero debitis temporibus in mei, at
              sit voluptua antiopam hendrerit.
            </p>

            <div className="mt-5 w-[70%] flex justify-between">
              <div>
                <h2>
                  School : <span className="font-[500]">0.7km</span>
                </h2>
                <h2>
                  University : <span className="font-[500]">1.7km</span>
                </h2>
                <h2>
                  Grocery Center : <span className="font-[500]">0.7km</span>
                </h2>
                <h2>
                  Market : <span className="font-[500]">0.7km</span>
                </h2>
              </div>

              <div>
                <h2>
                  Hospital, Medical : <span className="font-[500]">0.7km</span>
                </h2>
                <h2>
                  Metro Station : <span className="font-[500]">1.7km</span>
                </h2>
                <h2>
                  Gym, Wellness : <span className="font-[500]">0.7km</span>
                </h2>
                <h2>
                  River : <span className="font-[500]">1.7km</span>
                </h2>
              </div>
            </div>

            <hr className="mt-10" />
            <div className="mt-10">
              <h2 className="text-[23px] font-gvf font-[500]">Leave a Reply</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
                repellendus pariatur voluptates maiores sed vero corporis earum
                facere iste soluta!
              </p>

              <div className="mt-5">
                <h2>Your Rating</h2>
              </div>

              <div>
                <PropertyCommentHolder></PropertyCommentHolder>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[35%] items-center mt-10">
          <div className="w-full m-auto py-5 bg-white rounded-md">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-[25px] font-bvf font-bold">Price</h2>
                <span className="text-[20px]">${property.price}/month</span>
              </div>
              <hr className="py-3 mt-3" />
              <div className="flex justify-between">
                <div
                  className="flex space-x-2 items-center bg-gray-100 
                rounded-md px-2 py-1"
                >
                  <StarIcon size={15} />
                  <h2>Add to wishlist</h2>
                </div>

                <div className="">
                  <div className="flex space-x-2">
                    <Plus className="bg-slate-100 px-1 py-1" size={25} />
                    <ShareIcon className="bg-slate-100 px-1 py-1" size={25} />
                    <Printer className="bg-slate-100 px-1 py-1" size={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <AgentCardView user={property.user} />
          </div>

          <div
            className="bg-gray-50 shadow-sm rounded-md w-full mt-10
          px-5 py-5"
          >
            <h2 className="text-[25px] font-gvf">Schedule tour</h2>
            <PropertyEnqueryForm />
          </div>

          <div
            className="bg-white rounded-md w-full mt-10
          px-5 py-5"
          >
            <h2 className="text-[25px] font-gvf font-medium">
              Related Property
            </h2>
            <p className="mt-2 text-justify">
              Tantas signiferumque eum at, vix an dicant fierent homero
              dignissim.
            </p>

            <div>
              <PropertyCardView property={property}></PropertyCardView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
