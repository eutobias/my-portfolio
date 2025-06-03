import {
  SimpleImage
} from "@/components/ImageGrid/SimpleImage";
import { ProjectImages } from "@/data/projects.data";

interface TwoItemProps {
  images: ProjectImages[];
}

export const TwoItems = ({ images }: TwoItemProps) =>
  images.map((image, index) => (
    <SimpleImage
      key={`TwoItems-image-${index}`}
      src={image.src}
      thumb={image.thumb}
      alt={image?.alt}
      className="row-spawn-1"
    />
  ));
