import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface PropertyImages {
  id?: number;
  url: string;
  altText: string | null;
}

export function getListingDataSelect() {
  return {
    id: true,
    type: true,
    category: true,
    floor_plans:true,
    categoryId: true,
    userId: true,
    title: true,
    description: true,
    price: true,
    address: true,
    bed_rooms: true,
    bath_rooms: true,
    area: true,
    coordinates: true, // Ensure this matches the expected structure
    property_intro: true, // Ensure this matches the expected property
    features: true,
    created_at: true, // Assuming this is your created_at field
    images: {
      select: {
        id: true,
        imageUrl: true,
        order: true,
      },
    },
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    },
  } satisfies Prisma.ListingSelect;
}

export interface UserData {
  id: string; // Changed to number for actual user ID
  name: string; // Specify type
  email: string; // Specify type
  avatar: string | null; // Made optional for cases without an avatar
}

export interface PropertyImage {
  // Renamed to singular for consistency
  id: number; // Changed to number for actual image ID
  imageUrl: string; // Specify type
  order: number; // Assuming type is a number (could also be an enum)
}
export interface PropertyCoordinate {
  lat?: number; // Assuming coordinates are structured
  lng?: number;
}

export interface PropertyCategory {
  id: number;
  name: number;
}

export interface PropertyFeature {
  id: number;
  listingId: number;
  featureName: string;
  value: string;
  type:number
}
export interface FloorPlan {
  // Renamed to singular for consistency
  id: number; // Changed to number for actual image ID
  imageUrl: string; // Specify type
  order: number; // Assuming type is a number (could also be an enum)
  floor_name:string
}

export interface Property {
  id: number; // Property ID
  userId: string;
  categoryId: number;
  bed_rooms:number,
  area:number,
  bath_rooms:number,
  title: string; // Property title
  type: number;
  description: string; // Property description
  price: number; // Property price
  address: string; // Add address as a string
  coordinates: JsonValue;
  features: PropertyFeature[];
  created_at: Date;
  images: PropertyImage[];
  user: UserData;
  floor_plans:FloorPlan[]
}
