"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Sample review data with unique ids for each review
const reviews = [
  {
    id: 1,
    name: "John Doe",
    role: "Manager",
    avatar: "https://picsum.photos/1200/675?v=1",
    review: "Lorem ipsum dolor sit amet...Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CEO",
    avatar: "https://picsum.photos/1200/675?v=3",
    review: "Sed do eiusmod tempor..Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Product Manager",
    avatar: "https://picsum.photos/1200/675?v=5",
    review: "Quisque tincidunt..Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Designer",
    avatar: "https://picsum.photos/1200/675?v=8",
    review: "Vivamus finibus..Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Developer",
    avatar: "https://picsum.photos/1200/675?v=33",
    review: "Fusce suscipit odio..Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.",
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Marketing Specialist",
    avatar: "https://picsum.photos/1200/675?v=13",
    review: "Nullam ut felis...",
  },
  {
    id: 7,
    name: "William Brown",
    role: "Content Writer",
    avatar: "https://picsum.photos/1200/675?v=18",
    review: "Pellentesque habitant...",
  },
  {
    id: 8,
    name: "Olivia White",
    role: "Product Designer",
    avatar: "https://picsum.photos/1200/675?v=24",
    review: "Duis tristique nulla...",
  },
  {
    id: 9,
    name: "James Green",
    role: "UX/UI Developer",
    avatar: "https://picsum.photos/1200/675?v=8",
    review: "Curabitur pulvinar...",
  },
];

export default function ReviewCarousel({ variants }: { variants: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState<number>(0); // Use a single number instead of an array

  // Group reviews into sets of 4
  const chunkedReviews = [];
  for (let i = 0; i < reviews.length; i += 4) {
    chunkedReviews.push(reviews.slice(i, i + 4));
  }

  useEffect(() => {
    if (!api) return;
    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView()[0]); // Make sure we only update the first active thumbnail
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    setActiveThumbnail(index); // Set the active thumbnail index directly
  };

  return (
    <div className="w-full h-full mx-auto flex justify-center">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {chunkedReviews.map((group, groupIndex) => (
            <CarouselItem key={groupIndex}>
              <div className="grid grid-cols-1 md:grid-cols-2
               gap-10 justify-center w-full h-full">
                {group.map((review) => (
                  <div
                    key={review.id}
                    className="flex space-y-4  w-full h-full px-5 py-10"
                  >
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={100}
                      height={100}
                      className="rounded-full items-start h-[5rem] w-[5rem] object-cover"
                    />
                    <div className="ml-5 self-center h-full w-full flex-col space-y-35">
                      <div className="flex space-x-2 ">
                        <h3 className="text-xl font-semibold">{review.name}</h3>
                        <p className="text-sm text-gray-500 mt-3">
                          {review.role}
                        </p>
                      </div>
                      <p className="text-md text-gray-700">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center overflow-clip py-2 gap-4 mt-10">
          {chunkedReviews.map((data, groupIndex) => (
            <div key={groupIndex}>
              <div
                onClick={() => handleThumbnailClick(groupIndex)}
                className={cn(
                  groupIndex === activeThumbnail
                    ? "opacity-100"
                    : "opacity-75",
                  "bg-yellow-400 rounded-md transition-all h-3 w-3 duration-300 ease-in-out cursor-pointer hover:opacity-75"
                )}
              ></div>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
