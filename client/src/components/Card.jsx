import React from "react";

// Define the Card component
const Card = ({ name }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 shadow text-center max-w-xs">
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default Card;
