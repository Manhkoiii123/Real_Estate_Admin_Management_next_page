import React from "react";
import { twMerge } from "tailwind-merge";
const sizeClasses = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-6",
};
const Spinner = ({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        " mx-auto rounded-full border-primary  animate-spin",
        sizeClasses[size],
        className,
        "border-t-transparent"
      )}
    ></div>
  );
};

export default Spinner;
