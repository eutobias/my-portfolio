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
    <div className={classNames(`mx-auto w-full lg:max-w-3xl min-h-[100vh] relative pb-[124px] lg:pb-[128px]`, className)}>
      {children}
    </div>
  );
};
