import { z } from "zod";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const SearchLocationSchema = z.object({
  address: z.string(),
  coordinates: CoordinatesSchema,
});

export type SearchLocationSchema = z.infer<typeof SearchLocationSchema>;
