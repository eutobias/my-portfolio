import { classNames } from "@/lib/classNames";
import React from "react";
import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = `${styles["button-component"]} font-semibold 
    rounded-2xl transition-colors duration-200 cursor-pointer 
    w-auto active:translate-[2px] hover:opacity-70`;

  const variantStyles = {
    primary: "bg-highlight text-background hover:bg-tertiary",
    secondary: "bg-tertiary text-background hover:bg-highlight",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const mergedClasses = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className
  );

  return (
    <button className={mergedClasses} {...props}>
      {children}
    </button>
  );
};
