import { SimpleImage, SimpleImageProps } from "../SimpleImage";

interface OneItemProps {
  image: SimpleImageProps;
}

export const OneItem = ({ image }: OneItemProps) => (
  <SimpleImage src={image.src} alt={image?.alt} />
);
