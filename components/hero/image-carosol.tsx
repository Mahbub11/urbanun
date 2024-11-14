"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { PropertyImages } from "@/types/prisma-data-type";

interface PropertyImage {
  id: number;
  url: StaticImageData;
  order: number;
  altText:string
}
export default function HeroImageCarosol({
  variants,
}: {
  variants: PropertyImage[];
}) {
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
    <div className=" w-full h-full mx-auto flex justify-center relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="bg-green-100">
          {variants.map((variant) => {
            return (
              <CarouselItem key={variant.id}>
                {variant.url ? (
                  <Image
                    priority
                    className="rounded-md object-cover 
                    md:h-[45rem] md:w-full w-full sm:h-[40rem]"
                    width={500}
                    height={720}
                    src={variant.url}
                    alt={variant.altText ? variant.altText : ""}
                  />
                ) : null}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute bottom-[3%] left-1/2 transform -translate-x-1/2">
          <div className="flex justify-center overflow-clip py-2 gap-4 mt-5">
            {variants.map((variant, index) => {
              return (
                <div key={variant.id}>
                  {variant.url ? (
                    <div
                      onClick={() => updatePreview(index)}
                      className={cn(
                        index === activeThumbnail[0]
                          ? "opacity-100"
                          : "opacity-75",
                        "rounded-full transition-all bg-yellow-500 h-2 w-2 duration-300 ease-in-out cursor-pointer hover:opacity-75"
                      )}
                    ></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
