import { Box } from "@/components/Box";
import {
  ExperienceTimelineItem,
  ExperienceTimelineItemProps,
} from "@/components/ExperienceTimelineItem";
import { Heading } from "@/components/Heading";
import { MyAvatar } from "@/components/MyAvatar";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";
import { Timeline } from "@/components/Timeline";
import { TimelineItemProps } from "@/components/Timeline/TimelineItem";
import { experienceList } from "@/data/experience.data";

export const AboutExperience = () => {

  return (
    <RoundedBox className="flex-col gap-4 mt-8">
      <Box as="section" className="flex flex-col gap-4 mb-8">
        <Heading level={3}>Experience</Heading>
        <Timeline>
          {experienceList.map(({ content, icon, time, title }, index) => (
            <Timeline.Item
              icon={icon as TimelineItemProps['icon']}
              key={title + index}
              title={title}
              time={time}
              content={
                <ExperienceTimelineItem
                  companyName={content?.companyName}
                  bullets={content?.bullets}
                />
              }
            />
          ))}
        </Timeline>
      </Box>
    </RoundedBox>
  );
};
