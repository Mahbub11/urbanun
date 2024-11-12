import {
  Bath,
  BedDouble,
  Building,
  Building2,
  BuildingIcon,
  Eye,
  HeaterIcon,
  ParkingCircle,
  Plus,
  Printer,
  ShareIcon,
  StarIcon,
  SwitchCameraIcon,
} from "lucide-react";
import React from "react";

interface propType {
  id: number;
  listingId: number;
  featureName: string;
  value: string;
  type: number;
}
export default function PropertyFeatures({
  details,
  utility,
  features,
}: {
  details: propType[];
  utility: propType[];
  features: propType[];
}) {
  const getIconForFeature = (featureType: string) => {
    switch (featureType) {
      case "Swiming Pool":
        return <SwitchCameraIcon color="#595959" />;
      case "Floor":
        return <ParkingCircle color="#595959" />;
      case "Heater":
        return <HeaterIcon color="#595959" />;
      case "Ceiling Height":
        return <Building2 color="#595959" />;
      case "Renovatio1n":
        return <Building2 color="#595959" />;
      default:
        return <BuildingIcon color="#595959"></BuildingIcon>; // or a default icon
    }
  };
  return (
    <div className="text-gray-700 text-[15px]">
      <div className="flex-col space-y-10">
        <div>
          <h2 className="text-[23px] font-montreal font-[600]">
            Property Details
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            {details.map(({ featureName, value, id }) => (
              <div
                key={id}
                className="w-[90%] flex justify-between border-b
                 border-gray-200 pb-3"
              >
                <div className="flex space-x-3">
                  <span>{getIconForFeature(featureName)}</span>
                  <span>{featureName}:</span>
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-[23px] font-montreal font-[600]">
            Property Utility
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            {utility.map(({ featureName, value, id }) => (
              <div
                key={id}
                className="w-[90%] flex justify-between border-b
                 border-gray-200 pb-3"
              >
                <div className="flex space-x-3">
                  <span>{getIconForFeature(featureName)}</span>
                  <span>{featureName}:</span>
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[23px] font-montreal font-[600]">
            Outdoor features
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            {features.map(({ featureName, value, id }) => (
              <div
                key={id}
                className="w-[90%] flex justify-between border-b
                 border-gray-200 pb-3"
              >
                <div className="flex space-x-3">
                  <span>{getIconForFeature(featureName)}</span>
                  <span>{featureName}:</span>
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
