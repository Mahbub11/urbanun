import Image from "next/image";
import axiosInstance from "@/lib/axios";
import PropertyList from "@/components/home/property-list";

import HomeHero from "@/container/home/hero-container";
import PopularChoice from "@/container/home/popular-choice";
import SectionThreeBannar from "@/container/home/section-three-banar";
import HowItWorks from "@/container/home/how-it-works-section";
import SectionFiveBannar from "@/container/home/section-fmake-enquery";
import MakeRenovation from "@/container/home/make-renovation";
import SectionSixBannar from "@/container/home/section-six-banar";
import Review from "@/container/home/section-review";
import SectionNewsLatter from "@/container/home/section-newslatter";
import BrandShow from "@/container/home/brand-show";

// const fetchProperties = async (): Promise<PropertyWithImages[]> => {
//   try {
//     const response = await axiosInstance.get("/property"); // Replace with your API endpoint
//     const propertiesData = response.data.data;

//     // Validate the data using zod schema
//     const result =
//       PropertySchemaWithImageAddressCordinates.array().safeParse(
//         propertiesData
//       );

//     if (!result.success) {
//       // Detailed error logging
//       console.error("Validation failed:");

//       // Format and log errors in a readable way
//       const errors = result.error.format();
//       for (const [index, error] of Object.entries(errors)) {
//         console.error(`Error at index ${index}:`);
//         if (typeof error === "object") {
//           for (const [key, value] of Object.entries(error)) {
//             console.error(`  ${key}: ${JSON.stringify(value, null, 2)}`);
//           }
//         } else {
//           console.error(`  ${error}`);
//         }
//       }

//       return []; // Return an empty array if validation fails
//     }

//     return result.data;
//   } catch (error) {
//     console.error("Failed to fetch properties:", error);
//     return []; // Return an empty array on error
//   }
// };

const Home = async () => {
  return (
    <main
      className=" mt-10 
    pt-[2rem] flex-col space-y-[5rem] md:pb-10"
    >
      <HomeHero></HomeHero>
      <PopularChoice></PopularChoice>
      <SectionThreeBannar></SectionThreeBannar>
      <HowItWorks></HowItWorks>
      <SectionFiveBannar></SectionFiveBannar>
      <MakeRenovation></MakeRenovation>
      <SectionSixBannar></SectionSixBannar>
      <Review></Review>
      <SectionNewsLatter></SectionNewsLatter>
      <BrandShow></BrandShow>
    </main>
  );
};

export default Home;
