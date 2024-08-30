import LocationContainer from "@/components/PropertyLocation/LocationContainer";
import React from "react";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LocationContainer></LocationContainer>
      {children}
    </div>
  );
}
