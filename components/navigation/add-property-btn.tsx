"use client";
import React from "react";
import LocationContainer from "../PropertyLocation/LocationContainer";
import useLocationHolder from "@/store/useStore";

export default function AddPropertyBtn() {
  const { ToggleLocationContainer } = useLocationHolder();

  return (
    <div>
      <button onClick={ToggleLocationContainer}>Add Property</button>
    </div>
  );
}
