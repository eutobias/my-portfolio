import { type ElementType, type ComponentPropsWithoutRef, ReactElement } from "react";

export type TextSize =
  | "title/xl"
  | "title/lg"
  | "title"
  | "subtitle"
  | "body"
  | "caption";

export type TextProps<T extends ElementType = "span"> = {
  size?: TextSize;
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;


const sizeStyles: Record<TextSize, string> = {
  "title/xl": "text-4xl md:text-5xl",
  "title/lg": "text-3xl md:text-4xl",
  title: "text-2xl",
  subtitle: "text-xl",
  body: "text-[1rem]",
  caption: "text-sm",
};

/**
 * Typography component with predefined sizes, weights, and color variants.
 *
 * @example
 * <Text size="h1" className="text-red-500">Heading</Text>
 * <Text size="body" className="text-gray-900">Muted paragraph</Text>
 */
export const Text =  <T extends ElementType = "div">({
  size = "body",
  as,
  className = "",
  children,
  ...props
}: TextProps<T>): ReactElement => {
  const Tag = as ?? "p";

  return (
    <Tag className={`${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};
