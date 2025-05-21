import { classNames } from "@/lib/classNames";
import { JSX } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({
  level = 1,
  children,
  className = "",
}: HeadingProps) => {
  const baseStyles = "heading font-semibold text-headline";

  const sizeStyles = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  };

  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component className={classNames(baseStyles, sizeStyles[level], className)}>
      {children}
    </Component>
  );
};
