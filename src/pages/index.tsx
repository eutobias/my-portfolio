import { About } from "@/widgets/About";
import { Projects } from "@/widgets/Projects/projects.component";

export default function HomePage() {
  return (
    <>
      <About />
      <Projects isAtHomePage={true} />
    </>
  );
}
