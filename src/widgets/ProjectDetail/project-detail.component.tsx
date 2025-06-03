import { Box } from "@/components/Box";
import { CustomLink } from "@/components/CustomLink";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { ImageGrid } from "@/components/ImageGrid";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";
import { Project } from "@/data/projects.data";

interface ProjectDetailProps {
  project: Project;
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <RoundedBox className="project-detail-widget flex-col gap-8 mt-8">
      <Heading level={2}>{project?.name}</Heading>
      <ImageGrid images={project.images} />
      <Text variant="body">{project?.description}</Text>

      {project.frontend?.length && (
        <Box className="flex-col gap-2">
          <Heading level={4}>Frontend</Heading>

          <Box as="ul" className="flex-col gap-0">
            {project.frontend.map((item, index) => (
              <Text key={index} as="li" className="flex flex-row gap-2">
                <Icon icon="dot" className="stroke-highlight"/>
                <span>{item}</span>
              </Text>
            ))}
          </Box>
        </Box>
      )}

      {project.backend?.length && (
        <Box className="flex-col gap-2">
          <Heading level={4}>Backend</Heading>

          <Box as="ul" className="flex-col gap-0">
            {project.backend.map((item, index) => (
              <Text key={index} as="li" className="flex flex-row gap-2">
                <Icon icon="dot" className="stroke-highlight"/>
                <span>{item}</span>
              </Text>
            ))}
          </Box>
        </Box>
      )}

      <CustomLink href="/projects" size="large" className="place-self-end">Back to projects list</CustomLink>
    </RoundedBox>
  );
};
