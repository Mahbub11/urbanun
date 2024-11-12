import * as z from "zod";

export const ImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  type: z.number(),
  listingId: z.number(),
});

export type ImageSchema = z.infer<typeof ImageSchema>;
