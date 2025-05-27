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
      <Projects />

      <ImageGrid images={[
        { src: "https://placehold.co/800x1600" },
        { src: "https://placehold.co/600x2400" },
        { src: "https://placehold.co/800x1600" },
        { src: "https://placehold.co/600x2400" },
        { src: "https://placehold.co/800x1600" },
        // { src: "https://placehold.co/600x2400" },
        // { src: "https://placehold.co/600x2400" },
        // { src: "https://placehold.co/800x1600" },
        ]} />
    </Container>
  );
}
