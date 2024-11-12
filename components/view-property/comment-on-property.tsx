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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PropertyCommentSchema } from "@/types/property-comment-schema";

export function PropertyCommentHolder() {
  const form = useForm<z.infer<typeof PropertyCommentSchema>>({
    resolver: zodResolver(PropertyCommentSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PropertyCommentSchema>) => {};

  return (
    <div className="mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-col"
        >
          <div className="flex space-x-10">
            <div className="flex-col space-y-3 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-transparent px-2 py-5" placeholder="Enter Your Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input  className="bg-transparent px-2 py-5" placeholder="Enter Your Email" {...field}></Input>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                      rows={10}
                       className="bg-transparent px-2 py-5"
                        placeholder="Your Comment"
                        {...field}
                      ></Textarea>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="mt-10 w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
