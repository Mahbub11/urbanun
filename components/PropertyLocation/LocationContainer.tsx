"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocationHolder from "@/store/useStore";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function LocationContainer() {
  const { showLocationContainer, ToggleLocationContainer } =
    useLocationHolder();
  const [selectedAddress, setSelectedAddress] = useState<{
    label: string;
  }>();

  const router = useRouter();
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const nextHandler = async () => {
    console.log(selectedAddress, coordinates);

    if (selectedAddress && coordinates) {
      const data = {
        address: selectedAddress.label,
        coordinates: coordinates,
      };
      await axiosInstance
        .post("/property", data)
        .then((res) => {
          console.log(res);
          router.replace("/edit-listing/" + res.data.id);
          ToggleLocationContainer();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(selectedAddress);

  return (
    <div>
      <Dialog
        open={showLocationContainer}
        onOpenChange={(open) =>
          useLocationHolder.setState({ showLocationContainer: open })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
            <DialogDescription className="mt-10">
              <div className="mt-10">
                <GoogleAddressSearch
                  selectedAddress={(value: any) => setSelectedAddress(value)}
                  setCoordinates={(value: { lat: number; lng: number }) =>
                    setCoordinates(value)
                  }
                ></GoogleAddressSearch>

                <Button
                  className="mt-5 w-full bg-blue-800"
                  disabled={!selectedAddress || !coordinates}
                  onClick={nextHandler}
                >
                  {!selectedAddress ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
