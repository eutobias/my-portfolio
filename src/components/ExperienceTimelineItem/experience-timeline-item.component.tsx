import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";

export interface ExperienceTimelineItemProps {
  companyName: string;
  description?: string;
  bullets?: string[];
}

export const ExperienceTimelineItem = ({
  companyName,
  bullets,
  description,
}: ExperienceTimelineItemProps) => {
  return (
    <Box className="flex-col">
      <Heading level={6} className="text-highlight">
        {companyName}
      </Heading>
      <Text>{description}</Text>
      <Box as="ul" className="flex-col">
        {bullets?.map((bullet, index) => (
          <li className="list-disc ml-4" key={bullet + index}>
            {bullet}
          </li>
        ))}
      </Box>
    </Box>
  );
};
