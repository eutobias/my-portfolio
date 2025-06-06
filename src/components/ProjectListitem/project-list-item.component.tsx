import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import styles from "./project-list-item.module.scss";
import { classNames } from "@/lib/classNames";
import { truncate } from "@/lib/truncate";

export interface ProjectListItemProps {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export const ProjectListItem = ({
  title,
  content,
  imageUrl,
  imageAlt = "",
}: ProjectListItemProps) => {
  return (
    <Box
      className={classNames(styles["project-list-item"], "gap-4 items-center")}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          className="w-20 max-w-20 h-17 max-h-17 lg:w-35 lg:max-w-35 lg:h-25 lg:max-h-25 border-4 border-highlight rounded-2xl object-cover shrink-0"
          alt={imageAlt}
        />
      )}
      <Box className="flex-col">
        {title && <Heading level={5}>{title}</Heading>}
        {content && <Text variant="body">{truncate(content)}</Text>}
      </Box>
    </Box>
  );
};
