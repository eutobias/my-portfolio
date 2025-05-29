import {
  SimpleImage,
  SimpleImageProps,
} from "@/components/ImageGrid/SimpleImage";
import { classNames } from "@/lib/classNames";

interface ThreeItemsProps {
  images: SimpleImageProps[];
}
export const ThreeItems = ({ images }: ThreeItemsProps) => {
  const dynamicClasses = (index: number) => ({
    "lg:col-span-2 lg:row-span-2": index === 0,
    "lg:h-[154px]": index >= 1,
  });

  return images.map((image, index) => (
    <SimpleImage
      key={`ThreeItems-image-${index}`}
      src={image.src}
      alt={image?.alt}
      className={classNames(dynamicClasses(index))}
    />
  ));
};
