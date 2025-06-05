import { List } from "@/components/List";
import { ProjectListItem } from "@/components/ProjectListitem";
import { Project } from "@/data/projects.data";
import Link from "next/link";

interface ProjectsProps {
  isAtHomePage?: boolean;
  projects: Project[];
}

export const Projects = ({ isAtHomePage = false, projects = []}: ProjectsProps) => {
  const projectsAvailableList = isAtHomePage ? projects.slice(0, 3) : projects;

  
  return (
    <List className="mt-8">
      <List.Title>Projects</List.Title>
      {projectsAvailableList.map((project, index) => (
        <Link key={project.slug+index} href={`/projects/${project.slug}`}>
          <List.Item key={`project-list-item-${index}`}>
            <ProjectListItem
              title={project.name}
              content={project.description}
              imageUrl={project.images[0].thumb}
              imageAlt={project.images[0].alt}
            />
          </List.Item>
        </Link>
      ))}

      {isAtHomePage && (
        <List.ViewMore href="/projects">View all projects</List.ViewMore>
      )}
      {!isAtHomePage && (
        <List.ViewMore href="/">Back to home</List.ViewMore>
      )}
    </List>
  );
};
