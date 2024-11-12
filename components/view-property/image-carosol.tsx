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
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PropertyImages } from "@/types/prisma-data-type";

export default function PropertyImageCarosol({
  variants,
}: {
  variants: PropertyImages[];
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
    <div className=" w-full h-full mx-auto flex justify-center">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="bg-green-100">
          {variants.map((variant) => {
            return (
              <CarouselItem key={variant.id}>
                {variant.url ? (
                  <Image
                    priority
                    className="rounded-md object-cover 
                    md:h-[45rem] md:w-full"
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
        <div className="flex justify-center overflow-clip py-2 gap-4 mt-5">
          {variants.map((variant, index) => {
            return (
              <div key={variant.url}>
                {variant.url ? (
                  <Image
                    onClick={() => updatePreview(index)}
                    priority
                    className={cn(
                      index === activeThumbnail[0]
                        ? "opacity-100"
                        : "opacity-75",
                      "rounded-md transition-all md:h-[5rem] md:w-[10rem] duration-300 ease-in-out cursor-pointer hover:opacity-75"
                    )}
                    width={72}
                    height={48}
                    src={variant.url}
                    alt={variant.altText ? variant.altText : ""}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
}
