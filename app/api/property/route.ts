import { getListingDataSelect } from "@/types/prisma-data-type";
import prisma from "@/utils/prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// Types for request bodies
interface CreateListingRequest {
  address: string;
  coordinates: { lat: number; lng: number };
}

interface UpdateListingRequest {
  id: number;
  title?: string;
  description?: string;
  property_features?: string;
  size?: string;
  bed_rooms?: string;
  bath_rooms?: string;
  floor?: string;
  construction_year?: string;
  price?: number;
  type: number;
}
interface SearchQueryParams {
  type?: number;
  size?: string;
  bed_rooms?: string;
  bath_rooms?: string;
  floor?: string;
  construction_year?: string;
  cursor?: string;
  pageSize?: number;
}

// Helper functions for validation
const validateCreateListingRequest = (
  body: any
): body is CreateListingRequest => {
  return (
    body &&
    typeof body.address === "string" &&
    typeof body.coordinates === "object"
  );
};

const validateUpdateListingRequest = (
  body: any
): body is UpdateListingRequest => {
  return body && typeof body.id === "number";
};


export async function GET(req: NextRequest) {
  try {
    // Step 1: Extract and validate query parameters from the request URL
    const searchParams = req.nextUrl.searchParams;
    const query = {
      category: searchParams.has("category")
        ? parseInt(searchParams.get("category")!, 10)
        : undefined,
      location: searchParams.get("location") || undefined,
      type: searchParams.has("type")
        ? parseInt(searchParams.get("type")!, 10)
        : undefined,
      price: searchParams.get("price")
        ? searchParams.get("price")!.split(",").map(Number)
        : [0, 1000000],
      features: searchParams.get("features") || undefined,
      bed_rooms: searchParams.get("bed_rooms") || undefined,
      bath_rooms: searchParams.get("bath_rooms") || undefined,
      area: searchParams.get("area") || undefined,
      pageSize: searchParams.has("pageSize")
        ? parseInt(searchParams.get("pageSize")!, 10)
        : 10,
      cursor: searchParams.get("cursor") || undefined, // Handle cursor (for pagination)
    };

    console.log(query);

    // Step 2: Validate that numeric fields are valid numbers
    if (query.type && isNaN(query.type)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }

    // Step 3: Construct the where filter dynamically based on query parameters
    const whereFilter: { [key: string]: any } = {};

    // Category filter
    if (query.category !== undefined) whereFilter.categoryId = query.category;
    if (query.bed_rooms !== undefined) whereFilter.bed_rooms =  parseInt(query.bed_rooms, 10);;
    // Location filter
    if (query.location) whereFilter.address = query.location;

    // Type filter
    if (query.type !== undefined) whereFilter.type = query.type;

    // Handle price range filter
    if (query.price) {
      whereFilter.price = {
        gte: query.price[0],
        lte: query.price[1],
      };
    }


    // Handle bath_rooms filter
    if (query.bath_rooms) {
      whereFilter.bath_rooms = parseInt(query.bath_rooms, 10);
    }

    // Handle area range filter
    if (query.area) {
      const areaRange = query.area.split(",").map(Number);
      if (areaRange.length === 2) {
        whereFilter.area = {
          gte: areaRange[0], // Min area
          lte: areaRange[1], // Max area
        };
      } else {
        whereFilter.area = {
          gte: areaRange[0], // Single value filter (>=)
        };
      }
    }

    // Handle features filter
    if (query.features) {
      whereFilter.features = {
        some: { // 'some' to match at least one feature
          featureType: { in: query.features.split(",") }, // Filter features by types (e.g., 'bedrooms', 'size')
        },
      };
    }

    // Step 4: Handle cursor-based pagination
    const cursor = query.cursor
      ? { id: parseInt(query.cursor, 10) } // Use the cursor value (assumed to be the ID of the last item)
      : undefined;

    const take = query.pageSize + 1; // Fetch one extra item to determine if there's a next page
    const skip = cursor ? 1 : 0; // Skip the cursor item if pagination is used

    console.log(whereFilter)
    // Step 5: Fetch listings from the database with filters and pagination
    const listings = await prisma.listing.findMany({
      where: whereFilter,
      take,
      skip,
      cursor,
      orderBy: {
        id: 'asc', // Order by ID to make sure the cursor-based pagination is correct
      },
      select: getListingDataSelect(),
    });

    // Step 6: Determine the nextCursor for pagination
    const nextCursor = listings.length > query.pageSize
      ? listings[query.pageSize].id
      : null;

    // Step 7: Return the response with the listings data and nextCursor for pagination
    return NextResponse.json({
      properties: listings.slice(0, query.pageSize), // Remove the extra item that was fetched for pagination
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



// export async function GET(req: NextRequest) {
//   try {
//     // Step 1: Extract and validate query parameters
//     const searchParams = req.nextUrl.searchParams;
//     const query: SearchQueryParams = {
//       type: searchParams.has("type")
//         ? parseInt(searchParams.get("type")!, 10)
//         : undefined,
//       size: searchParams.get("size") || undefined,
//       bed_rooms: searchParams.get("bed_rooms") || undefined,
//       bath_rooms: searchParams.get("bath_rooms") || undefined,
//       floor: searchParams.get("floor") || undefined,
//       construction_year: searchParams.get("construction_year") || undefined,
//       cursor: searchParams.get("cursor") || undefined,
//       // Set default value for pageSize if not provided
//       pageSize: searchParams.has("pageSize")
//         ? parseInt(searchParams.get("pageSize")!, 10)
//         : 10,
//     };

//     // Step 2: Explicitly handle default for pageSize
//     const pageSize = query.pageSize ?? 10; // If `query.pageSize` is undefined, use 10 as the default

//     // Step 3: Validate that numeric fields are actually numbers (if provided)
//     if (query.type && isNaN(query.type)) {
//       return NextResponse.json(
//         { error: "Invalid type parameter" },
//         { status: 400 }
//       );
//     }

//     // Step 4: Construct the where filter dynamically based on query parameters
//     const whereFilter: { [key: string]: any } = {};

//     if (query.type !== undefined) whereFilter.type = query.type;
//     if (query.size) whereFilter.size = query.size;
//     if (query.bed_rooms) whereFilter.bed_rooms = query.bed_rooms;
//     if (query.bath_rooms) whereFilter.bath_rooms = query.bath_rooms;
//     if (query.floor) whereFilter.floor = query.floor;
//     if (query.construction_year)
//       whereFilter.construction_year = query.construction_year;

//     // Step 5: Convert cursor to a number (if provided) and handle pagination
//     const cursor = query.cursor
//       ? { id: parseInt(query.cursor, 10) }
//       : undefined; // Ensure id is a number
//     const take = pageSize + 1; // Fetch one extra item to check for the next page
//     const skip = cursor ? 1 : 0; // Skip the cursor item if pagination is used

//     // Step 6: Fetch listings from the database with filters and pagination
//     const listings = await prisma.listing.findMany({
//       where: whereFilter,
//       take,
//       skip,
//       cursor,
//       include: { images: true }, // Include related images
//     });

//     // Step 7: Determine nextCursor for pagination
//     const nextCursor =
//       listings.length > pageSize ? listings[pageSize].id : null;

//     // Step 8: Return the response with the listings data and nextCursor for pagination
//     return NextResponse.json({
//       listings: listings.slice(0, pageSize), // Remove the extra item
//       nextCursor,
//     });
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body: CreateListingRequest = await req.json();
    if (!validateCreateListingRequest(body)) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    const { address, coordinates } = body;
    // const newListing = await prisma.listing.create({
    //   data: { address:address },
    // });
    return new NextResponse(JSON.stringify({ }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return new NextResponse("Failed to create listing", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: UpdateListingRequest = await req.json();
    if (!validateUpdateListingRequest(body)) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    const {
      id,
      title,
      description,
      property_features,
      size,
      bed_rooms,
      bath_rooms,
      floor,
      construction_year,
      price,
      type,
    } = body;
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        price,
        type,
      },
      include: { images: true },
    });
    return new NextResponse(JSON.stringify({ data: updatedListing }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return new NextResponse("Failed to update listing", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (typeof id !== "number") {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    await prisma.listing.delete({ where: { id } });
    return new NextResponse(null, { status: 204 }); // No content
  } catch (error) {
    console.error("Error deleting listing:", error);
    return new NextResponse("Failed to delete listing", { status: 500 });
  }
}
