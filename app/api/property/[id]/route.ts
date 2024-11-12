import prisma from "@/utils/prisma/client";
import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const propertyId = parseInt(url.pathname.split('/').pop() || '', 10);

    if (isNaN(propertyId)) {
      return new NextResponse("Invalid property ID", { status: 400 });
    }
    const data = await prisma.listing.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        images: true, // Include related images
      },
    });

    return new Response(JSON.stringify({ data: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to Fetch Data", { status: 500 });
  }
};
