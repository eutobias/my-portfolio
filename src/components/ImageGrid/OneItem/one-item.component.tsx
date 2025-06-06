import { ProjectImages } from "@/data/projects.data";
import { SimpleImage } from "../SimpleImage";

interface OneItemProps {
  image: ProjectImages;
}

export const OneItem = ({ image }: OneItemProps) => (
  <SimpleImage src={image.src} thumb={image.thumb} alt={image?.alt} />
);
