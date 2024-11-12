"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { brandFive, brandFour, brandOne, brandThree, brandTwo } from "@/public";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay"

const brands = [
  {
    id: 1,
    name: "Nike",
    image: brandOne,
  },
  {
    id: 2,
    name: "Adidas",
    image: brandTwo,
  },
  {
    id: 3,
    name: "Puma",
    image: brandThree,
  },
  {
    id: 4,
    name: "Reebok",
    image: brandFour,
  },
  {
    id: 5,
    name: "Under Armour",
    image: brandFive,
  },
  {
    id: 6,
    name: "Adidas",
    image: brandTwo,
  },
  {
    id: 7,
    name: "Puma",
    image: brandThree,
  },
  {
    id: 8,
    name: "Reebok",
    image: brandFour,
  },
  {
    id: 9,
    name: "Under Armour",
    image: brandFive,
  },
  {
    id: 10,
    name: "Adidas",
    image: brandTwo,
  },
  {
    id: 11,
    name: "Puma",
    image: brandThree,
  },
  {
    id: 12,
    name: "Reebok",
    image: brandFour,
  },
  {
    id: 13,
    name: "Under Armour",
    image: brandFive,
  },
];
export default function BrandShow() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);

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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className="md:px-5 px-2 font-montreal text-gray-800 py-10">
      <div className="md:h-[15rem] mt-[-4rem] w-full bg-[#FFCC41]">
        <div>
          <Carousel
            plugins={[plugin.current]}
            className="w-[80%] mx-auto flex justify-center items-center h-full"
            setApi={setApi}
            opts={{ loop: true }}
          >
            <CarouselContent className=" flex space-x-5 md:mt-[3.5rem] sm:py-5">
              {brands.map((variant) => {
                return (
                  <CarouselItem className="md:basis-[10rem] 
                  flex justify-center w-full" key={variant.id}>
                    {variant.image ? (
                      <Image
                        priority
                        className="rounded-md object-cover h-auto w-auto"
                        width={500}
                        height={720}
                        src={variant.image}
                        alt={variant.name}
                      />
                    ) : null}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
