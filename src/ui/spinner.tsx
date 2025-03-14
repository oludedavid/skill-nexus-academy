"use client";

import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "white",
  className = "",
}) => {
  // Size mapping
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  // Border thickness based on size
  const borderMap = {
    sm: "border-2",
    md: "border-2",
    lg: "border-3",
    xl: "border-4",
  };

  return (
    <div
      className={`${sizeMap[size]} ${borderMap[size]} ${className} 
                border-solid rounded-full border-t-transparent animate-spin`}
      style={{
        borderColor: `${color} transparent transparent transparent`,
      }}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
