import axiosInstance, { BASE_URL } from "@/lib/axios";
import { SearchLocationSchema } from "@/types/Search.location.type";
import { ImageSchema } from "@/types/image-schema";
import { PropertySchema, PropertyWithImages } from "@/types/property-items";

export const getPropertyIds = async (): Promise<PropertyWithImages[]> => {
  try {
    const res = await axiosInstance.get<{ data: PropertyWithImages[] }>(
      "/property"
    );

    return res.data.data; // Extract the `data` property from the response
  } catch (error) {
    console.error("Error fetching property IDs:", error);
    throw new Error("Could not fetch property IDs"); // Handle errors as needed
  }
};

export const getProperty = async (id: number): Promise<PropertyWithImages> => {
  try {
    const res = await axiosInstance.get<{ data: PropertyWithImages }>(
      `property/${id}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching property IDs:", error);
    throw new Error("Could not fetch property IDs");
  }
};

export const createProperty = async (data: SearchLocationSchema) => {
  await axiosInstance.post("property", data);
};

export const updateProperty = async (
  data: typeof PropertySchema
): Promise<PropertyWithImages> => {
  try {
    const res = await axiosInstance.put(`property`, data);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching property IDs:", error);
    throw new Error("Could not fetch property IDs");
  }
};

export const deleteProperty = async (id: number) => {
  await axiosInstance.delete(`property/${id}`);
};

type OmitId<T> = Omit<T, "id">;
export const saveImage = async (data: OmitId<ImageSchema>) => {
  await axiosInstance
    .post("property/image", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteImage = async (id: number) => {
  await axiosInstance.delete(`property/image/${id}`);
};
