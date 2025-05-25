import { List } from "@/components/List";
import { ProjectListItem } from "@/components/ProjectListitem";
import { projects } from "@/data/projects.data";

export const Projects = () => {
  return (
    <List className="mt-8">
      <List.Title>Projects</List.Title>
      {projects.map((project, index) => (
        <List.Item key={`project-list-item-${index}`}>
          <ProjectListItem
            title={project.name}
            content={project.description}
            imageUrl={project.images[0].src}
            imageAlt={project.images[0].alt}
          />
        </List.Item>
      ))}
    </List>
  );
};
