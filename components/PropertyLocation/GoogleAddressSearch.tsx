"use client";
import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

interface GoogleAddressSearchProps {
  selectedAddress: (value: any) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}

function GoogleAddressSearch({
  selectedAddress,
  setCoordinates,
}: GoogleAddressSearchProps) {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY as string} // Ensure apiKey is a string
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            selectedAddress(place);
            if (place?.label) {
              geocodeByAddress(place.label)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  console.log(lat, lng);
                  setCoordinates({ lat, lng });
                })
                .catch((error) => {
                  console.error("Error getting coordinates:", error);
                });
            }
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
