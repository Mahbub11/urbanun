"use client";

import React, { useState } from "react";
import { Property } from "@/types/prisma-data-type";

interface PropertyComparisonProps {
  properties: Property[];
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
}) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  // Handle selection of properties
  const handleSelectProperty = (property: Property) => {
    setSelectedProperties((prevState) => {
      if (prevState.includes(property)) {
        return prevState.filter((item) => item.id !== property.id);
      }
      return [...prevState, property];
    });
  };

  // Render comparison table for selected properties
  const renderComparisonTable = () => {
    if (selectedProperties.length === 0)
      return <p>Select properties to compare</p>;

    // Collect all unique feature names across selected properties
    const allFeatureNames = Array.from(
      new Set(
        selectedProperties.flatMap((property) =>
          property.features.map((feature) => feature.featureName)
        )
      )
    );

    const propertiesToCompare = selectedProperties.map((property) => (
      <tr key={property.id}>
        <td>{property.title}</td>
        <td>{property.price}</td>
        <td>{property.bed_rooms}</td>
        <td>{property.bath_rooms}</td>
        <td>{property.address}</td>
        {allFeatureNames.map((featureName) => {
          // Find the feature value for this property and feature name
          const feature = property.features.find(
            (feature) => feature.featureName === featureName
          );
          return <td key={featureName}>{feature ? feature.value : "N/A"}</td>;
        })}
      </tr>
    ));

    return (
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Address</th>
            {allFeatureNames.map((featureName) => (
              <th key={featureName}>{featureName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{propertiesToCompare}</tbody>
      </table>
    );
  };

  return (
    <div className="property-comparison-container">
      <h2 className="text-2xl font-semibold mb-4">Compare Properties</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {properties.map((property) => (
          <div key={property.id} className="property-card border p-4">
            <h3 className="font-semibold">{property.title}</h3>
            <p>{property.price} USD</p>
            <button
              className="mt-4 text-white bg-blue-500 py-2 px-4 rounded"
              onClick={() => handleSelectProperty(property)}
            >
              {selectedProperties.includes(property) ? "Deselect" : "Select"}{" "}
              for Comparison
            </button>
          </div>
        ))}
      </div>

      <div className="comparison-table mt-8">{renderComparisonTable()}</div>
    </div>
  );
};

export default PropertyComparison;
