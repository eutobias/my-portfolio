import { Box } from "@/components/Box";
import { TimelineItem } from "@/components/Timeline/TimelineItem";

interface TimelineProps {
  children: React.ReactNode;
}

const Timeline = ({ children }: TimelineProps) => {
  return <Box className="flex flex-col">{children}</Box>;
};

Timeline.Item = TimelineItem;

export { Timeline };
