import { classNames } from "@/lib/classNames";
import { ReactNode } from "react";
import styles from "./text.module.scss";

type TextTag = "p" | "span" | "strong" | "em";

interface TextProps {
  as?: TextTag;
  variant?: "body" | "large" | "small" | "caption";
  children: ReactNode;
  className?: string;
}

export const Text = ({
  as = "p",
  variant = "body",
  children,
  className = "",
}: TextProps) => {
  const baseStyles = "text text-subline";

  const variantStyles = {
    body: "text-base md:text-lg",
    large: "text-lg md:text-xl",
    small: "text-sm md:text-base",
    caption: "text-xs md:text-sm",
  };

  const Component = as;

  return (
    <Component
      className={classNames(
        styles["text"],
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};
