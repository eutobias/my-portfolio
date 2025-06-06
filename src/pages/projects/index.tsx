import { projects } from "@/data/projects.data";
import { Projects } from "@/widgets/Projects/projects.component";

export default function ProjectsPage() {
  return <Projects projects={projects} isAtHomePage={false} />;
}
