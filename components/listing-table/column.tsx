"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertySchema, PropertyWithImages } from "@/types/property-items";
import Link from "next/link";
import { localurl } from "@/config";

export const ListingColumns: ColumnDef<PropertyWithImages>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "construction_year",
    header: "Build",
  },
  {
    accessorKey: "created_at",
    header: "Added",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2 text-white">
        <Link
          href={`${localurl}view-property/${row.original.id}`}
          className="bg-custom-btn_color px-2 py-2 rounded-md"
        >
          View
        </Link>

        <Link
          href={`${localurl}edit-listing/${row.original.id}`}
          className="bg-custom-btn_color px-2 py-2 rounded-md"
        >
          Edit
        </Link>
        <Link
          href={`${localurl}listing/${row.original.id}`}
          className="bg-red-300 px-2 py-2 rounded-md"
        >
          Delete
        </Link>
      </div>
    ),
  },
];
