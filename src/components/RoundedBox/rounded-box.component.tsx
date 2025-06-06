import { Box } from "@/components/Box";
import { classNames } from "@/lib/classNames";
import React from "react";

interface RoundedBoxProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export const RoundedBox = ({
  children,
  className = "",
  as = "div",
}: RoundedBoxProps) => {
  return (
    <Box
      as={as}
      className={classNames(
        "w-full lg:max-w-3xl bg-foreground p-8 rounded-2xl",
        className
      )}
    >
      {children}
    </Box>
  );
};
