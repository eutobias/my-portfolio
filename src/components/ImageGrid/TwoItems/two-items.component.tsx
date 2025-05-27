import {
  SimpleImage,
  SimpleImageProps,
} from "@/components/ImageGrid/SimpleImage";

interface TwoItemProps {
  images: SimpleImageProps[];
}

export const TwoItems = ({ images }: TwoItemProps) =>
  images.map((image) => (
    <SimpleImage
      src={image.src}
      alt={image?.alt}
      className="row-spawn-1"
    />
  ));
