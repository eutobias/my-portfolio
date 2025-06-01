import { classNames } from "@/lib/classNames";
import React from "react";
import styles from "./custom-link.module.scss";
import Link, { LinkProps } from "next/link";

interface CustomLinkProps extends LinkProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
}

export const CustomLink = ({
  variant = "primary",
  size = "medium",
  children,
  className,
  onClick,
  ...props
}: CustomLinkProps) => {
  const baseStyles = `
    ${styles["link-component"]} font-semibold w-auto underline
    active:translate-[2px] 
    hover:opacity-70`;

  const variantStyles = {
    primary: "text-highlight hover:text-tertiary",
    secondary: "text-tertiary hover:text-highlight",
  };

  const sizeStyles = {
    small: "text-sm",
    medium: "",
    large: "text-lg",
  };

  const mergedClasses = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <Link className={mergedClasses} {...props}>
      {children}
    </Link>
  );
};
