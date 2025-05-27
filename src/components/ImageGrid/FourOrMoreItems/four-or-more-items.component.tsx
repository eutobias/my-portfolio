import {
  SimpleImage,
  SimpleImageProps,
} from "@/components/ImageGrid/SimpleImage";
import { classNames } from "@/lib/classNames";

interface FourOrMoreItemsProps {
  images: SimpleImageProps[];
}
export const FourOrMoreItems = ({ images }: FourOrMoreItemsProps) => {
  const dynamicClasses = (index: number) => ({
    "lg:col-span-3 lg:row-span-3 lg:max-h-[316px]": index === 0,
    "h-[100px] shrink-0": index >= 1,
  });

  return images.map((image, index) => {
    return (
      <SimpleImage
        src={image.src}
        alt={image?.alt}
        className={classNames(dynamicClasses(index))}
      />
    );
  });
};
