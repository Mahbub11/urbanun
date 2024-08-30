"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import MyIcon from "../../public/logoSite.svg";
// import Logo from "@/public/Assets/SVG/Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus, UserRoundPlus } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
// import SignInContent from "./SignInContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationContainer from "../PropertyLocation/LocationContainer";
import useLocationHolder from "@/store/useStore";

export default function NavBar() {
  const { showLocationContainer, ToggleLocationContainer } =
    useLocationHolder();

    console.log(showLocationContainer)

  const { user, isSignedIn } = useUser();
  return (
    <nav
      className=" font-semibold shadow-sm flex justify-between
     px-2 py-1 items-center sticky top-0 z-100"
    >
      <div className=" px-3 py-2 items-center w-full flex gap-10">
        <Fragment>
          <span className="drop-shadow-2xl ml-5">
            <Link href={"/"}>
              <Image src="/logo.png" height={80} width={80} alt="logo"></Image>
            </Link>
            {/* <Logo
              secondFill="#AAFC9D"
              width={100}
              height={50}
              fill="#216d3e"
            ></Logo> */}
          </span>
          <div className="flex gap-5 mt-1 sm:text-[20px]">
            <Link className="sm:text-[20px]" href={"/"}>
              For Sell
            </Link>
            <Link href={"/"}>For Rent</Link>
            <Link href={"/"}>Find Agent</Link>
          </div>
        </Fragment>
      </div>

      <div
        className="mr-[1rem] flex gap-5 w-full justify-end 
      "
      >
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={38}
                height={35}
                alt="user profile"
                className="cursor-pointer rounded-full border-blue-300 border-[2px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/user#/my-listing"}>My Listing</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                {" "}
                <SignOutButton>Logout</SignOutButton>{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center hover:underline">
            <UserRoundPlus height={15}></UserRoundPlus>
            <Link href="/sign-in">Sign In</Link>
          </div>
        )}

        <div
          className="flex items-center bg-blue-500 rounded-md
         px-2 py-2 text-white"
        >
          <Plus height={15}></Plus>
          <button onClick={ToggleLocationContainer}>Add Property</button>
        </div>
      </div>
    </nav>
  );
}
