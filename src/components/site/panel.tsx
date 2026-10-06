import type { ElementType, ReactNode, ReactElement } from "react";

import { Box } from "@/components/box";

export type PanelShadow = "none" | "sm" | "md" | "lg";

export type PanelProps<T extends ElementType = "div"> = {
  as?: T;
  shadow?: PanelShadow;
  tone?: "bg" | "surface";
  children: ReactNode;
  className?: string;
};

const shadows: Record<PanelShadow, string> = {
  none: "",
  sm: "shadow-[2px_2px_0_0_var(--border)]",
  md: "shadow-[6px_6px_0_0_var(--border)]",
  lg: "shadow-[8px_8px_0_0_var(--border)]",
};

/**
 * Neo-brutalist surface: 4px border, no radius, optional offset shadow.
 */
export const Panel = <T extends ElementType = "div">({
  as,
  shadow = "md",
  tone = "surface",
  children,
  className = "",
}: PanelProps<T>): ReactElement => {
  const Tag = as ?? "div";
  const background = tone === "bg" ? "bg-[var(--bg)]" : "bg-[var(--bg-2)]";

  return (
    <Box
      as={Tag}
      className={`flex-col border-4 border-[var(--border)] ${background} ${shadows[shadow]} ${className}`}
    >
      {children}
    </Box>
  );
};
