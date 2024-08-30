import prisma from "@/utils/prisma/client";
import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await prisma.listing.findMany();

    console.log(data);

    return new Response("Fetched", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { address, coordinates } = body;

    console.log(address, coordinates);

    const newListing = await prisma.listing.create({
      data: {
        address: address,
        coordinates: coordinates,
      },
    });

    return new Response(JSON.stringify({ id: newListing.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const {id, title,description,property_features,size,bed_rooms,
    bath_rooms,floor,construction_year,price } = body;

   
    const newListing = await prisma.listing.update({
      where: {
        id: id // Specify the listing to update by its id
      },
      data: {
        title,
        description,
        property_features, 
        size,
        bed_rooms,
        bath_rooms, 
        floor,
        construction_year,
        price
      },
    });
    return new Response(JSON.stringify({ id: newListing.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

