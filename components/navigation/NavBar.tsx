import Image from "next/image";
import React, { Fragment } from "react";
import MyIcon from "../../public/logoSite.svg";
// import Logo from "@/public/Assets/SVG/Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, Plus, UserRoundPlus } from "lucide-react";
// import SignInContent from "./SignInContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddPropertyBtn from "./add-property-btn";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = await auth();
  console.log(session?.user);
  return (
    <nav
      className="bg-white font-semibold flex justify-between
     px-2 md:py-4 py-2 items-center fixed top-0 left-0 w-full z-50"
    >
      <div className=" px-3 py-2 items-center w-full flex gap-10">
        <Fragment>
          <span
            className="md:drop-shadow-2xl ml-5
          "
          >
            <Link href={"/"}>
              <Image src="/logo.png" height={70} width={80} alt="logo"></Image>
            </Link>
            {/* <Logo
              secondFill="#AAFC9D"
              width={100}
              height={50}
              fill="#216d3e"
            ></Logo> */}
          </span>
          <div className="hidden md:flex gap-5 mt-1 ">
            <Link
              className=""
              href={"/property/?type=2&priceMin=10&priceMax=500000"}
            >
              For Sell
            </Link>
            <Link href={"/property/?type=1&priceMin=10&priceMax=500000"}>
              For Rent
            </Link>
            <Link href={"/agent"}>Find Agent</Link>
          </div>
        </Fragment>
      </div>

      <div className="mr-[1rem] flex gap-5 w-full justify-end">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <h2
                  className="bg-blue-300 font-bold cursor-pointer px-2 py-2 w-10 text-center h-10
              rounded-full"
                >
                  {session.user.name?.charAt(0)}
                </h2>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/dashboard/listing"}>My Listing</Link>
              </DropdownMenuItem>

              <DropdownMenuItem> </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center hover:underline">
            <Link className="flex space-x-4 items-center" href="/sign-in">
              <UserRoundPlus height={15}></UserRoundPlus>
              <p className="mb:hidden"> Sign In</p>
            </Link>
          </div>
        )}

        <div className="md:hidden sm:block self-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu></Menu>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className="hidden md:flex items-center bg-blue-500 rounded-md
         px-2 py-2 text-white"
        >
          <Plus height={15}></Plus>
          <AddPropertyBtn></AddPropertyBtn>
        </div>
      </div>
    </nav>
  );
}
