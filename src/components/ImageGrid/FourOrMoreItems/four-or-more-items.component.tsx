import { SimpleImage } from "@/components/ImageGrid/SimpleImage";
import { ProjectImages } from "@/data/projects.data";
import { classNames } from "@/lib/classNames";

interface FourOrMoreItemsProps {
  images: ProjectImages[];
}
export const FourOrMoreItems = ({ images }: FourOrMoreItemsProps) => {
  const dynamicClasses = (index: number) => ({
    "lg:col-span-3 lg:row-span-3 lg:max-h-[316px]": index === 0,
    "h-[100px] shrink-0": index >= 1,
  });

  return images.map((image, index) => {
    return (
      <SimpleImage
        key={`FourOrMoreItems-image-${index}`}
        src={image.src}
        thumb={image.thumb}
        alt={image?.alt}
        className={classNames(dynamicClasses(index))}
      />
    );
  });
};
