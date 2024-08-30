import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Fragment, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LocationContainer from "@/components/PropertyLocation/LocationContainer";
import ContentLayout from "./(layout)/ContentHolder";
import localFont from '@next/font/local';


const inter = Inter({ subsets: ["latin"] });

const moder = localFont({
  src: '../public/fonts/Moderustic-VariableFont_wght.ttf',
  variable: '--moder',
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
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavBar></NavBar>
          <div className="mt-10 -z-10">
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              <ContentLayout> {children}</ContentLayout>
            </Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
