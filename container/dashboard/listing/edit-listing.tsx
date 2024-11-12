"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

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
import { PropertyWithImages, PropertySchema } from "@/types/property-items";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { CircleX, Delete, DeleteIcon, OctagonX } from "lucide-react";
import {
  useSaveImag,
  useUpdateProperty,
} from "@/app/services/property/mutations";
import { Card } from "@/components/ui/card";
import FileUpload from "@/components/listing/FileUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface propsPass {
  listingData: PropertyWithImages;
}

export function EditListing({ listingData }: propsPass) {
  console.log(listingData);
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState(false);

  const updatePropertyMutation = useUpdateProperty();
  const savePropertyImageMutation = useSaveImag();

  const form = useForm<PropertySchema>({
     //resolver: zodResolver(PropertySchema),
    defaultValues: {
      id: listingData.id,
      type: listingData.type ?? 0,
      title: listingData.title ?? "",
      description: listingData.description ?? "",
      property_features: listingData.property_features ?? "",
      size: listingData.size ?? "",
      bed_rooms: listingData.bed_rooms ?? "",
      bath_rooms: listingData.bath_rooms ?? "",
      floor: listingData.floor ?? "",
      construction_year: listingData.construction_year ?? "",
      price: listingData.price ?? 0,
    },
    mode: "onChange",
  });

  const uploadImage = async () => {
    for (const image of images) {
      // Generate file name and get file extension
      const fileName = Date.now().toString();
      const fileExt = image.name.split(".").pop();

      // Upload image to Supabase
      const { error: uploadError } = await supabase.storage
        .from("propertyImages")
        .upload(`${fileName}`, image, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (uploadError) {
        console.log("Error uploading image:", uploadError);
        continue; // Skip to next image on error
      }

      // Construct image URL
      const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

      // Prepare image data for saving
      const imgData = {
        imageUrl: imageUrl,
        listingId: listingData.id,
        type: 1,
      };

      // Save image data using mutation
      await savePropertyImageMutation.mutateAsync(imgData);
      setImages([]);
    }
  };
  const onSubmit = async (values: PropertySchema) => {
    console.log(values);
    try {
      // Update the property

      const formattedValues = {
        ...values,
        id: listingData.id,
        price: Number(values.price),
        type: Number(values.type), // Overwrite `type` with a number
      };

      // await updatePropertyMutation.mutateAsync(formattedValues);

      console.log(updatePropertyMutation);
      // Upload images

      // Set status to trigger reloading
      setStatus(true);
    } catch (error) {
      console.log("Error submitting property:", error);
    }
  };

  const handleImageDelete = async (value: number) => {
    const getImageData = listingData.images.filter(
      (image) => image.id === value
    )[0];

    const urlParts = getImageData.imageUrl.split("/");
    const lastSegment = urlParts[urlParts.length - 1];
    const { data, error } = await supabase.storage
      .from("propertyImages")
      .remove([`${lastSegment}`]);

    if (error) {
      console.log(error);
    }
    if (data) {
      const data = {
        id: getImageData.id,
      };
      await axiosInstance
        .delete("/property/image", { data })
        .then((res) => {
          console.log(res);
          setStatus(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log("Extracted ID from URL:", lastSegment);
  };

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-col"
        >
          <div className="flex space-x-10">
            <div className="w-[50%] ">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">For Sell</SelectItem>
                      <SelectItem value="1">For Rent</SelectItem>
                     
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

             
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-3">
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
                  uploadImage={uploadImage}
                  setImages={(value) =>
                    setImages((prev) => [...prev, ...value])
                  }
                ></FileUpload>
              </div>

              <div className="mt-10">
                <div className="flex flex-wrap space-x-3">
                  {listingData.images?.map((imageUrl) => (
                    <Card
                      className="relative overflow-hidden"
                      key={imageUrl.imageUrl}
                    >
                      <CircleX
                        stroke="#FFFF"
                        onClick={() => handleImageDelete(imageUrl.id)}
                        className="absolute shadow-md 
                        hover:bg-red-300 bg-transparent/40 rounded-full cursor-pointer top-2 right-2  text-white
                         transition-colors"
                      >
                        {/* Hypothetical delete icon */}
                      </CircleX>

                      <Image
                        src={imageUrl.imageUrl}
                        alt={"Image"}
                        className="object-cover h-[10rem] w-[10rem]"
                        width={700}
                        height={700}
                      />
                    </Card>
                  ))}
                </div>
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
