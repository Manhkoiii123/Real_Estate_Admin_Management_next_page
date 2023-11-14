import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../loading/Spinner";
interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  onClick?: any;
}
const variantClasses = {
  primary: "text-white bg-primary",
  secondary: "text-white bg-secondary",
};
const sizeClasses = {
  sm: "text-[10px]",
  md: "text-base ",
  lg: "text-lg ",
};
const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  onClick,
  ...props
}: IProps) => {
  const child = !!isLoading ? (
    <Spinner size="sm" className="border-white " />
  ) : (
    children
  );
  return (
    <button
      className={twMerge(
        "flex items-center justify-center font-semibold p-2.5 gap-2 disabled:opacity-50",
        className,
        sizeClasses[size],
        variantClasses[variant],
        isLoading ? "opacity-50 pointer-events-none" : ""
      )}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
