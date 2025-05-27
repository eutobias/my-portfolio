import { classNames } from "@/lib/classNames";

export interface SimpleImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const SimpleImage = ({ src, alt = "", className = "" }: SimpleImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames("object-cover w-full max-h-[200px] lg:max-h-[316px]", className)}
    />
  );
};