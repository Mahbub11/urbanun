import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import { Fragment, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LocationContainer from "@/components/PropertyLocation/LocationContainer";
import ContentLayout from "./(layout)/ContentHolder";
import localFont from "@next/font/local";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

const moder = localFont({
  src: "../public/fonts/Moderustic-VariableFont_wght.ttf",
  variable: "--moder",
});
const monda = localFont({
  src: "../public/fonts/Monda-VariableFont_wght.ttf",
  variable: "--monda",
});

export const metadata: Metadata = {
  title: "Urbanun",
  description: "Find your Home ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <NavBar></NavBar>
        <Toaster></Toaster>
        <div className="mt-[5.7rem] ">
          <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
            <ContentLayout> {children}</ContentLayout>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
