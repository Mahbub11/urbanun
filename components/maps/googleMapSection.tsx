"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleMapSectionProps {
  coordinates: Coordinates;
  title: string;
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || ""; // Ensure you have this set up correctly

function GoogleMapSection({ coordinates, title }: GoogleMapSectionProps) {
  console.log(coordinates);
  const [center, setCenter] = useState<Coordinates>({
    lat: 23.8041,
    lng: 90.4152,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  useEffect(() => {
    if (coordinates) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (map) {
      map.setZoom(5);
    }
  }, [map]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center); // Extend the bounds with the center point
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  // Conditional rendering based on loading state
  if (!isLoaded) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.3,
    strokeWeight: 1,
    fillColor: "#FF0000",
    fillOpacity: 0.7,
    center: center,
    radius: 5000, // 5 km
  };
  const markerOptions = {
    position: center,
    title: title, // Customize marker title
  };

  // Ensure hooks are consistently called on each render
  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker {...markerOptions} />
          <Circle {...circleOptions} />
        </GoogleMap>
      ) : (
        ""
      )}
    </div>
  );
}

export default GoogleMapSection;
