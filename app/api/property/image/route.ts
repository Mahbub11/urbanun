import prisma from "@/utils/prisma/client";
import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await prisma.property_images.findMany({
      include: {
        Listing: true, // Fetch related Listing data
      },
    });

    return new Response(JSON.stringify({ data: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { imageUrl, listingId, order } = body;

    const newListing = await prisma.property_images.create({
      data: {
        imageUrl,
        listingId,
        order,
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
    const {
      id,
      title,
      description,
      property_intro,
      price,
    } = body;

    const newListing = await prisma.listing.update({
      where: {
        id: id, // Specify the listing to update by its id
      },
      data: {
        title,
        description,
        property_intro,
        price,
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

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.property_images.delete({
      where: {
        id: id, // Specify the listing to delete by its id
      },
    });
    return new Response(JSON.stringify({ message: "Content Delete" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed ", { status: 500 });
  }
};
