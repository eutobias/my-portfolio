import type { ElementType, ReactNode, ReactElement } from "react";

import { Box } from "@/components/box";
import type { TextProps } from "@/components/text";
import { Text } from "@/components/text";

export type TitleWithIconProps<T extends ElementType = "h2"> = {
  icon: ReactNode;
  children: string;
  as?: T;
  size?: TextProps["size"];
  iconClassName?: string;
  className?: string;
};

/**
 * Section heading composed from `Box` (layout) + `Text` (type scale), with a
 * leading icon. Example of the "generics + composition" pattern.
 */
export const TitleWithIcon = <T extends ElementType = "h2">({
  icon,
  children,
  as,
  size = "heading",
  iconClassName = "text-[var(--accent)]",
  className = "",
}: TitleWithIconProps<T>): ReactElement => {
  return (
    <Box className={`items-center gap-3 ${className}`}>
      <span aria-hidden className={iconClassName}>
        {icon}
      </span>
      <Text as={as ?? "h2"} size={size} className="uppercase tracking-tight">
        {children}
      </Text>
    </Box>
  );
};
