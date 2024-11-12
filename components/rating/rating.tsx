'use client'
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";

export default function RatingStar() {
  const [rating, setRating] = useState(0); // Initial value
  return (
    <div>
       
      <Rating style={{ maxWidth: 250,height:200 }} value={rating} onChange={setRating} />
    </div>
  );
}
