import { Box } from "@/components/Box";
import { FourOrMoreItems } from "@/components/ImageGrid/FourOrMoreItems";
import { OneItem } from "@/components/ImageGrid/OneItem";
import { ThreeItems } from "@/components/ImageGrid/ThreeItems";
import { TwoItems } from "@/components/ImageGrid/TwoItems";
import { ProjectImages } from "@/data/projects.data";
import { classNames } from "@/lib/classNames";
import { PhotoProvider } from "react-photo-view";

interface ImageGridProps {
  images: ProjectImages[];
}

export const ImageGrid = ({ images }: ImageGridProps) => {
  const wrapperDefaultClasses = "grid grid-cols-1 gap-2";
  const dynamicClasses = {
    "lg:grid-cols-2": images.length === 2,
    "lg:grid-cols-3": images.length === 3,
    "lg:grid-cols-4": images.length >= 4,
  };

  return (
    <Box className={classNames(wrapperDefaultClasses, dynamicClasses)}>
      <PhotoProvider>
        {images.length === 1 && <OneItem image={images[0]} />}
        {images.length === 2 && <TwoItems images={images} />}
        {images.length === 3 && <ThreeItems images={images} />}
        {images.length >= 4 && <FourOrMoreItems images={images} />}
      </PhotoProvider>
    </Box>
  );
};
