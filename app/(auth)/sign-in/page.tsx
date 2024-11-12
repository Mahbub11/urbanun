"use client";
import EmblaCarousel from "@/components/signIn/EmblaCarosoul";
import { EmblaOptionsType } from "embla-carousel";
import image1 from "@/public/Images/sign_in_bannar1.jpg";
import image2 from "@/public/Images/sign_in_Bannar2.jpg";
import image3 from "@/public/Images/sign_in_bannar3.jpg";
import Image from "next/image";
import LoginForm from "@/components/signIn/sign-in-form";

// Create an array of image objects
const images = [
  { src: image1, alt: "Description for image 1" },
  { src: image2, alt: "Description for image 2" },
  { src: image3, alt: "Description for image 3" },
];

export default function Page() {
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="h-[40rem] md:hidden sm:hidden lg:block lg:w-[60%]">
        <Image
          height={90}
          width={40}
          alt=""
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="
               rounded-sm inset-0 h-full w-full object-cover opacity-80"
        ></Image>
      </div>

      <div className="flex-1 mt-[5rem] lg:mt-0 max-w-md mx-auto p-6 border border-gray-300
     rounded-lg shadow-lg">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
