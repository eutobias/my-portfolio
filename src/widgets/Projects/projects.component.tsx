import { List } from "@/components/List";
import { ProjectListItem } from "@/components/ProjectListitem";

export const Projects = () => {
  return (
    <List className="mt-8">
      <List.Title>Projects</List.Title>
      {[1, 2, 3, 4, 5].map((i) => (
        <List.Item key={i}>
          <ProjectListItem
            title={`Project Title ${i}`}
            content={`Project Description ${1}`}
            imageUrl={i%2===0 ? "https://placehold.co/600x100": "https://placehold.co/600x400" }
            imageAlt={`Thumb preview of project ${i}`}
          />
        </List.Item>
      ))}
    </List>
  );
};
