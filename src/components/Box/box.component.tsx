import { ReactNode, JSX } from "react";
import { classNames } from "@/lib/classNames";

interface BoxProps {
  children?: ReactNode;
  className?: string;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: number;
  wrap?: boolean;
  fullWidth?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function Box({
  children,
  className,
  direction = "row",
  align = "stretch",
  justify = "start",
  gap = 0,
  wrap = false,
  fullWidth = true,
  as = "div",
}: BoxProps) {
  const Component = as;

  return (
    <Component
      className={classNames(
        "flex",
        {
          "flex-row": direction === "row",
          "flex-col": direction === "column",
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
          "justify-start": justify === "start",
          "justify-center": justify === "center",
          "justify-end": justify === "end",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
          "flex-wrap": wrap,
          "w-full": fullWidth,
        },
        `gap-${gap}`,
        className
      )}
    >
      {children && children}
    </Component>
  );
}
