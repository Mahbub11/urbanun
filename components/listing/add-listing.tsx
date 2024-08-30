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
import FileUpload from "./FileUpload";
import { PropertySchema } from "@/types/property-items";
import { useState } from "react";
import axiosInstance from "@/lib/axios";

export function AddListing() {
  const [images, setImages] = useState<FileList[]>([]);

  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      title: "",
      description: "",
      // Add more fields as needed.
    },
  });

  const onSubmit=async(values: z.infer<typeof PropertySchema>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const newVal={id:1,...values}
    console.log(newVal);
    if(images.length > 0) {
      console.log('Add image')
    }

    await axiosInstance.put('/property',newVal).then((res)=>{
      console.log(res)
      //router.replace('/edit-listing/'+res.data.id);
    }).catch((err)=>{
      console.log(err)
    })

    


  }
  console.log(images);
  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-col"
        >
          <div className="flex space-x-10">
            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of the Property" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriptions</FormLabel>
                    <FormControl>
                      <Textarea {...field}></Textarea>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Feature Description</FormLabel>
                    <FormControl>
                      <Textarea {...field}></Textarea>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h2 className="mt-10 text-[20px] font-bold">
                  Property Detailes
                </h2>

                <div className="mt-2 w-[20rem] ">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bed_rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bed Rooms</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bath_rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bath Rooms</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="construction_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Construction Year</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div>
                <h2>Property Images</h2>
                <FileUpload
                  images={images}
                  setImages={(value) => setImages((prev) => [...prev, value])}
                ></FileUpload>
              </div>

              {/* <div className="mt-5">
                <h2>Floor Plan</h2>
                <FileUpload
                  setImages={(value) => setImages(value)}></FileUpload>
              </div> */}
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
