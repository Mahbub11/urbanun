'use client'
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Property } from "@/types/prisma-data-type";
import {
  Bath,
  BedIcon,
  Building,
  LocateIcon,
  MapPin,
  PlusIcon,
  Star,
} from "lucide-react";
import Link from "next/link";

interface PropertyListProps {
  property: Property;
}

const PropertyCardView: React.FC<PropertyListProps> = ({ property }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const searchParams = useSearchParams();

  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);
 
  return (
    <>
      <Link href={`property/${property.id}`} className="w-auto cursor cursor-pointer">
        <div className="group relative overflow-hidden">
          <div className="w-full flex justify-between absolute top-5 z-10">
            <div className="bg-transparent/10 backdrop-blur-md px-3 py-1 rounded-r-sm">
              <p className="font-[500] w-full text-white"></p>
             <span className="text-white">
               {property.type === 0 ? "Sell" : property.type === 1 ? "Rent" : ""}</span>
            </div>
            <div
              className="bg-transparent/10 
            transform translate-y-[-120px]
            group-hover:translate-y-[2px] transition-all
             duration-500 backdrop-blur-md px-3 py-1 rounded-l-sm flex space-x-5"
            >
              <PlusIcon stroke="#FFFF" size={20} />
              <Star stroke="#FFFF" size={20} />
            </div>
          </div>

          <Carousel className="relative" setApi={setApi} opts={{ loop: true }}>
            <CarouselContent className="bg-green-100">
              {property?.images.map((variant) => {
                return (
                  <CarouselItem key={variant.id}>
                    {variant.imageUrl ? (
                      <Image
                        priority
                        className="object-cover rounded-sm w-full h-[20rem] opacity-85"
                        width={500}
                        height={820}
                        src={variant.imageUrl}
                        alt={variant.imageUrl ? variant.imageUrl : ""}
                      />
                    ) : null}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* <div className="flex justify-center overflow-clip py-2 gap-4 mt-5">
            {property.images.map((variant, index) => {
              return <div key={variant.imageUrl}></div>;
            })}
          </div> */}

            <div
              className=" transform translate-y-full 
            group-hover:translate-y-[-60px] transition-all duration-500 absolute
            w-full flex justify-between px-3 pointer-events-auto cursor-pointer"
            >
              <div>
                <div className="flex items-center">
                  <Image
                    className="h-10 z-10 w-10 rounded-full object-cover"
                    height={200}
                    width={300}
                    src={property.user.avatar!}
                    alt="profile agent"
                  ></Image>

                  <div
                    className="h-7 w-fit bg-transparent/10  backdrop-blur-md ml-[-1rem] rounded-r-md
                    "
                  >
                    <p className="ml-4 px-2 mt-[2px] text-white">
                      {property.user.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center overflow-clip space-x-2 mt-10">
                {property.images.map((variant, index) => (
                  <div
                    key={variant.imageUrl}
                    className={`h-2 w-2 rounded-md cursor-pointer ${
                      index === activeThumbnail[0]
                        ? "bg-[#FFFF]"
                        : "bg-slate-500"
                    }`}
                    onClick={() => updatePreview(index)} // On click, scroll to the respective slide
                  ></div>
                ))}
              </div>
            </div>
          </Carousel>
        </div>
        <div className="mt-5">
          <div className="flex space-x-1">
            <MapPin size={20}></MapPin>
            <p className="line-clamp-1">{property.address}</p>
          </div>
          <div className="ml-1 mt-3">
            <h2 className="font-gvf text-[24px] font-[500] line-clamp-1">
              {property.title}
            </h2>
            <p className="line-clamp-2">{property.description}</p>
          </div>
          <hr className="mt-5 h-2"></hr>
          <div className="px-2 flex justify-between">
            <p className="font-gvf font-[500] text-[20px]">
              {property.price} $
            </p>
            <div className="flex space-x-2">
              <div className="flex space-x-1">
                <BedIcon size={20}></BedIcon>
                <p>{property.bed_rooms}</p>
              </div>
              <div className="flex space-x-1">
                <Bath size={20}></Bath>
                <p>{property.bath_rooms}</p>
              </div>

              <div className="flex space-x-1">
                <Building size={20}></Building>
                <p>
                  {property.area}m<sup>2</sup>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PropertyCardView;
