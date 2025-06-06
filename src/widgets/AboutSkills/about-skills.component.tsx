import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { RoundedBox } from "@/components/RoundedBox";
import { Timeline } from "@/components/Timeline";
import { skillList } from "@/data/skillls.data";

export const AboutSkills = () => {
  return (
    <RoundedBox className="mt-8">
      <Box as="section" className="flex flex-col gap-4">
        <Heading level={3}>Skills</Heading>
        <Timeline>
          {skillList.map((skill, index) => (
            <Timeline.Item
              key={skill.title + index}
              title={skill.title}
              content={skill.content}
              icon={skill.icon}
              time={skill.time}
            />
          ))}
        </Timeline>
      </Box>
    </RoundedBox>
  );
};
