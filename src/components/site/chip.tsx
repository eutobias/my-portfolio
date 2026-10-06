import type { ReactNode } from "react";

import { Text } from "@/components/text";

export type ChipProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Monospace tag/badge with a 2px border and small offset shadow.
 */
export const Chip = ({ children, className = "" }: ChipProps) => (
  <Text
    as="span"
    size="monoSm"
    className={`inline-flex w-fit items-center border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-1 shadow-[2px_2px_0_0_var(--border)] ${className}`}
  >
    {children}
  </Text>
);
