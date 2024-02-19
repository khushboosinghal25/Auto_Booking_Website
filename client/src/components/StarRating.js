import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ value, onChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= value ? "gold" : "gray",
            fontSize: "24px", // Adjust the size of the stars
          }}
          onClick={() => onChange(star)}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
