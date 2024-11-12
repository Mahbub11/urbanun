// src/components/Onboarding.tsx
'use client'
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define validation schema using Zod
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  userRole: z.enum(["buyer", "agent", "agency"], {
    message: "User role is required",
  }),
});

type FormData = z.infer<typeof schema>;

export default function Onboarding() {
  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Form submit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Handle form submission (e.g., sending data to the backend)
    console.log("Form Data:", data);

    // Example redirect (replace with actual navigation logic if needed)
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Onboarding</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Select {...register("userRole")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="I'm a" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="seller">Agent</SelectItem>
              <SelectItem value="agency">Agency</SelectItem>
            </SelectContent>
          </Select>

          {errors.userRole && (
            <p className="mt-2 text-sm text-red-600">
              {errors.userRole.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
