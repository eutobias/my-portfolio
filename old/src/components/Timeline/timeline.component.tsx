import { Box } from "../Box";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  children: React.ReactNode;
}

const Timeline = ({ children }: TimelineProps) => {
  return <Box className="flex flex-col">{children}</Box>;
};

Timeline.Item = TimelineItem;

export { Timeline };
