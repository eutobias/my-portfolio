import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  ReactElement,
} from "react";

import { Box } from "@/components/box";
import { Text } from "@/components/text";

export type BrutalButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "highlight";

export type BrutalButtonSize = "sm" | "md";

export type BrutalButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: BrutalButtonVariant;
  size?: BrutalButtonSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

const variants: Record<BrutalButtonVariant, string> = {
  primary: "bg-[var(--primary)] text-[var(--primary-ink)]",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-ink)]",
  accent: "bg-[var(--accent)] text-[var(--accent-ink)]",
  highlight: "bg-[var(--highlight)] text-[var(--highlight-ink)]",
};

const sizes: Record<BrutalButtonSize, string> = {
  sm: "border-2 px-3 py-2 text-[12px] shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)]",
  md: "border-4 px-6 py-4 text-[14px] shadow-[6px_6px_0_0_var(--border)] hover:shadow-[4px_4px_0_0_var(--border)]",
};

/**
 * Neo-brutalist button built on `Box` + `Text`. Surface colors come from the
 * active theme tokens (`--primary`, `--secondary`, `--accent`, `--highlight`).
 */
export const BrutalButton = <T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: BrutalButtonProps<T>): ReactElement => {
  const Tag = as ?? "button";

  return (
    <Box
      as={Tag}
      className={`w-fit cursor-pointer items-center justify-center gap-2 border-[var(--border)] font-semibold uppercase tracking-[0.04em] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:-translate-x-1.5 active:-translate-y-1.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <Text as="span" size="small" font="sans" className="font-bold">
        {children}
      </Text>
      {icon ? <span aria-hidden>{icon}</span> : null}
    </Box>
  );
};
