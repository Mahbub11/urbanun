import * as z from "zod";

export const PropertySchema = z.object({
  id: z.number(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  type: z.string().transform((value) => parseInt(value, 10)),
  description: z.string().min(20, {
    message: "Description must be at least 40 characters long",
  }),
  property_features: z.string().min(20, {
    message: "Description must be at least 40 characters long",
  }),
  size: z.string().min(1, {
    message: "Size must be at least 1",
  }),
  bed_rooms: z.string().min(1, {
    message: "Size must be at least 1",
  }),
  bath_rooms: z.string().min(1, {
    message: "Size must be at least 1",
  }),
  floor: z.string().min(1, {
    message: "Size must be at least 1",
  }),
  construction_year: z.string().min(1, {
    message: "Size must be at least 1",
  }),
  price: z.coerce.number().min(10, {
    message: "Price must be at least 10",
  }),
});

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const PropertySchemaWithImageAddressCordinates = PropertySchema.extend({
  images: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string().url(),
      type: z.number(),
      listingId: z.number(),
    })
  ),
  address: z.string(),
  coordinates: CoordinatesSchema,
});

export type PropertySchema = z.infer<typeof PropertySchema>;
export type PropertyWithImages = z.infer<
  typeof PropertySchemaWithImageAddressCordinates
>;


export type SearchParamsTypes = {
  bed_rooms:string,
  bath_rooms:string,
  features: string[]; // Array of feature strings from getAll("features")
  type: string;       // A single string from get("type"), defaulting to an empty string
  category: string;   // A single string from get("category"), defaulting to an empty string
  location: string;   // A single string from get("location"), defaulting to an empty string
  priceMin: string;   // A number from get("priceMin"), defaulting to 10 if not present
  priceMax: string;   // A number from get("priceMax"), defaulting to 500000 if not present
};
