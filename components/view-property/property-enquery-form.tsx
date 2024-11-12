"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { link } from "fs";

export function PropertyEnqueryForm() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input  className="bg-transparent px-2 py-5" placeholder="Your Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input  className="bg-transparent px-2 py-5" placeholder="Your Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input  className="bg-transparent px-2 py-5" placeholder="Your Phone" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea  className="bg-transparent px-2 py-5" placeholder="Your Message" {...field}></Textarea>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="bg-yellow-200 w-full overflow-hidden group mt-3">
          <button
            className="bg-yellow-300 w-full relative px-3 py-2 font-[600]
                   overflow-hidden group"
          >
            <h2 className="relative z-10 tracking-wide">Make Enquiry</h2>
            {/* Pseudo-element for filling effect */}
            <span
              className="absolute inset-0 bg-yellow-400 group-hover:w-full 
                    transition-all duration-500 w-0"
            ></span>
          </button>
        </div>
        </form>
      </Form>
    </div>
  );
}
