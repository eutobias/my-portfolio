import { classNames } from "@/lib/classNames";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mx-auto w-full lg:max-w-3xl ${className}`}
    >
      {children}
    </div>
  );
};
