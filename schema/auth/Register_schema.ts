import * as z from "zod"

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  userType: z.enum(["BUYER", "AGENT", "AGENCY"], {
    required_error: "Select Your ROLE",
  }),
})