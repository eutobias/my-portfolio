import { projects } from "@/data/projects.data";
import { About } from "@/widgets/About";
import { Projects } from "@/widgets/Projects/projects.component";


export default function HomePage() {
  return (
    <>
      <About isAtHomePage={true} />
      <Projects projects={projects} isAtHomePage={true} />
    </>
  );
}