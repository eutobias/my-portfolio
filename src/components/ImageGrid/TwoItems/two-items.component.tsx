import {
  SimpleImage,
  SimpleImageProps,
} from "@/components/ImageGrid/SimpleImage";

interface TwoItemProps {
  images: SimpleImageProps[];
}

export const TwoItems = ({ images }: TwoItemProps) =>
  images.map((image, index) => (
    <SimpleImage
      key={`TwoItems-image-${index}`}
      src={image.src}
      alt={image?.alt}
      className="row-spawn-1"
    />
  ));
