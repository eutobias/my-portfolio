import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { Icon, IconProps } from "@/components/Icon";
import { Text } from "@/components/Text";

export interface TimelineItemProps {
  title: string;
  time?: string;
  content: React.ReactNode;
  icon: IconProps["icon"];
}

export const TimelineItem = ({
  icon,
  title,
  time,
  content,
}: TimelineItemProps) => {
  return (
    <>
      <Box className="gap-2 items-center">
        <Icon
          icon={icon}
          className="bg-background stroke-highlight rounded-full p-2"
          size={40}
        />
        <Heading level={6} className="shrink-0">
          {title}
        </Heading>
      </Box>
      <Box className="flex-col py-2 pl-7 relative before:content-[''] before:absolute before:top-0 before:left-5 before:w-[2px] before:h-full before:bg-highlight">
        <Box className="flex gap-2 items-center pl-5">
          <Text variant="caption" className="text-headline p-0">
            {time}
          </Text>
        </Box>
        <Box className="pl-5">{content}</Box>
      </Box>
    </>
  );
};
