import { Container } from "@/components/Container";
import { ImageGrid } from "@/components/ImageGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { About } from "@/widgets/About";
import { Navigation } from "@/widgets/Navigation";
import { Projects } from "@/widgets/Projects/projects.component";

export default function Home() {
  return (
    <Container>
      <ThemeToggle />
      <Navigation />
      <About />
      <Projects isAtHomePage={true} />
    </Container>
  );
}
