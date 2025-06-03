import { Project, projects } from "@/data/projects.data";
import { ProjectDetail } from "@/widgets/ProjectDetail";
import { GetServerSidePropsContext } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  project: Project;
}

ProjectPage.getInitialProps = async(context: GetServerSidePropsContext) => {
  const { query } = context

  const project = projects.find(
    (project) => project.slug === query?.id
  );

  return {  project };
}

export default function ProjectPage({ project }: ProjectPageProps) {

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
