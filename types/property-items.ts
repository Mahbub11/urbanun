import * as z from "zod"

export const PropertySchema = z.object({
  
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 40 characters long",
  }),
  property_features: z.string().min(20, {
    message: "Description must be at least 40 characters long",
  }),
  size: z.string().min(1,{
    message:"Size must be at least 1"
  }),
  bed_rooms: z.string().min(1,{
    message:"Size must be at least 1"
  }),
  bath_rooms: z.string().min(1,{
    message:"Size must be at least 1"
  }),
  floor: z.string().min(1,{
    message:"Size must be at least 1"
  }),
  construction_year: z.string().min(1,{
    message:"Size must be at least 1"
  }),
  price: z.coerce.number().min(10,{
    message:"Price must be at least 10"
  })
})

export type PropertySchema = z.infer<typeof PropertySchema>