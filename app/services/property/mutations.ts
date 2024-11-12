import { PropertySchema, PropertyWithImages } from "@/types/property-items";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty, deleteProperty, saveImage, getProperty } from "./api";
import { ImageSchema } from "@/types/image-schema";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  // return useMutation({
  //   mutationFn: (data: PropertySchema) => updateProperty(),
  //   onSettled: async (_, error, variables) => {
  //     if (error) {
  //       toast("Data Updated Failed");
  //       console.log(error);
  //     } else {
  //       toast("Data Updated");
  //       console.log(variables);
  //       // await queryClient.refetchQueries({ queryKey: ["properties"] });
  //       // await queryClient.invalidateQueries({
  //       //   queryKey: ["property", { id: variables.id }],
  //       // });
  //     }
  //   },
  // });
}

export function useDeleteproperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProperty(id),

    onSuccess: () => {
      console.log("deleted successfully");
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["propertys"] });
      }
    },
  });
}

export function useSaveImag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ImageSchema, "id">) => saveImage(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: async (data, variables, context) => {
      toast("Image Uploaded");
      console.log("Success:", variables);
      // Optionally invalidate the property query here
      await queryClient.invalidateQueries({
        queryKey: ["property", { id: variables.listingId }],
      });
    },
    onSettled: async (data, error, variables, context) => {
      // // Retrieve existing properties from the cache
      // const existingProperties = queryClient.getQueryData<PropertyWithImages[]>(
      //   ["properties"]
      // );
      // console.log(existingProperties);
      // if (existingProperties) {
      //   // Find the specific property based on listingId
      //   const updatedProperties = existingProperties.map((property) => {
      //     if (property.id === variables.listingId) {
      //       return {
      //         ...property,
      //         images: [...property.images, data], // Assuming 'data' is the new image data returned
      //       };
      //     }
      //     return property; // Return unchanged property
      //   });
      //   // Update the cache with the new list of properties
      //   queryClient.setQueryData(["properties"], updatedProperties);
      // }
      // // Optional: Refetch the properties or invalidate queries as needed
      // await queryClient.refetchQueries({ queryKey: ["properties"] });
    },
  });
}
