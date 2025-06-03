import { classNames } from "@/lib/classNames";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export interface SimpleImageProps {
  thumb?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export const SimpleImage = ({
  thumb,
  src,
  alt = "",
  className = "",
}: SimpleImageProps) => {
  return (
      <PhotoView src={src}>
        <img
          src={thumb}
          alt={alt}
          className={classNames(
            "object-cover w-full max-h-[200px] lg:max-h-[316px] rounded-2xl",
            className
          )}
        />
      </PhotoView>
  );
};
