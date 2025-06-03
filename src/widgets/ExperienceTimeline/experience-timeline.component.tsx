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

export const ExperienceTimeline = () => {
  const skillList: TimelineItemProps[] = [
    {
      title: "Languages",
      content: "HTML, CSS, Javascript, Typescript, Go, Python, PHP, SQL",
      icon: "binary",
    },
    {
      title: "Front-end",
      content:
        "React, React Native, Next.js, Vue, Angular, SASS, LESS, Tailwind, REST APIs, GraphQL, Microfrontends",
      icon: "code",
    },
    {
      title: "Back-end",
      content:
        "Node.js, Express, NestJS, Fastify, Laravel, Flask, Microservices, AWS, Azure, Docker, Kubernetes, CI/CD, Git",
      icon: "braces",
    },
  ];

  const experienceList = [
    {
      title: "Senior Front-end Engineer",
      time: "09/2023 - 04/2025",
      content: {
        companyName: "Arcotech",
        bullets: [
          "Developed and architected scalable microfrontends using React, Next.js, and TypeScript",
          "Optimized CI/CD pipelines",
          "Developed a test question management system used by over 10,000 educational institutions",
        ],
      },
      icon: "file-code-2",
    },

    {
      title: "Senior Front-end Engineer",
      time: "01/2023 - 06/2023",
      content: {
        companyName: "Invillia (Oz.Inc)",
        bullets: [
          "Built interfaces with React + Redux + TypeScript, integrating with APIs and Blockchains",
        ],
      },
      icon: "file-code-2",
    },
    {
      title: "Tech Lead",
      time: "02/2021 - 06/2022",
      content: {
        companyName: "Original.io",
        bullets: [
          "Managed and mentored a team of 15 developers in creating and optimizing e-commerce stores on VTEX. (VTex Legacy e VTEX.io)",
          "Led the team that migrated Reserva's e-commerce platform from Oracle Commerce Cloud to VTEX",
        ],
      },
      icon: "computer",
    },
    {
      title: "Senior Full-stack Developer",
      time: "05/2018 - 02/2021",
      content: {
        companyName: "Reserva",
        bullets: [
          "Integrated Oracle Commerce Cloud with custom frontends (React, Vue, KnockoutJS)",
          "Developed and maintained microservices and APIs using Node.js, C#, and Go",
          "Built product recommendation platform integration, boosting sales significantly.",
        ],
      },
      icon: "file-terminal",
    },
    {
      title: "Senior Front-end Developer",
      time: "03/2017 - 04/2018",
      content: {
        companyName: "VML (Oi Telecom)",
        bullets: [
          "Developed and enhanced product pages and widgets using React and Redux  ",
          "As part of the A/B testing team, I implemented and validated hypotheses that consistently improved website revenue.",
        ],
      },
      icon: "file-code-2",
    },
    {
      title: "Junior ~ Senior Full-stack Developer",
      time: "12/2007 - 09/2016",
      content: {
        companyName: "32Bits",
        bullets: [
          "Created interactive applications for museums and exhibitions (projection mapping, motion detection)",
          "Developed institutional websites using HTML, CSS, PHP, JavaScript",
          "Managed teams during exhibition setup",
        ],
      },
      icon: "file-code-2",
    },
  ];

  return (
    <RoundedBox className="flex-col gap-4 mt-8">
      <Box className="m-auto flex flex-col items-center mb-4">
        <MyAvatar />
      </Box>

      <Box as="section" className="flex flex-col gap-4 mb-8">
        <Heading level={3}>Summary</Heading>
        <Text>
          Senior developer with over{" "}
          <strong className="highlight">
            15 years of experience specializing in JavaScript, TypeScript,
            React, Node.js, and cloud architectures.
          </strong>{" "}
          Passionate about building scalable solutions from microservices and
          REST APIs to AI applications (LLMs, Agents). Proven experience leading
          teams and delivering projects for e-commerce platforms, websites,
          mobile apps, exhibitions, and educational systems.
        </Text>
      </Box>

      <Box as="section" className="flex flex-col gap-4 mb-8">
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

      <Box as="section" className="flex flex-col gap-4 mb-8">
        <Heading level={3}>Experience</Heading>
        <Timeline>
          {experienceList.map(({ content, icon, time, title }, index) => (
            <Timeline.Item
              icon="file-code-2"
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
