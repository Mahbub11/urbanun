import { z } from 'zod';

// Define the schema
export const PropertyCommentSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),
  comment: z.string()
    .max(500, { message: "Comment must be less than 500 characters" }),
});

export type PropertyCommentSchema = z.infer<typeof PropertyCommentSchema>