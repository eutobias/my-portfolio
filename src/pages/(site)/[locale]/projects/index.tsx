import { FiLayers } from "react-icons/fi";
import type { PageProps } from "waku/router";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { Chip } from "@/components/site/chip";
import { TitleWithIcon } from "@/components/site/title-with-icon";
import { Shell } from "@/components/site/ui";
import { getProjects } from "@/portfolio/portfolio.server";

export default async function ProjectsPage({ locale }: PageProps<"/[locale]/projects">) {
  const projects = getProjects(locale);

  return (
    <Shell>
      <div className="flex flex-col gap-10 py-12 md:py-16">
        <title>Meus Projetos - Tobias Taurian</title>

        <Box className="flex-col gap-4 border-b-4 border-[var(--border)] pb-6">
          <TitleWithIcon icon={<FiLayers aria-hidden className="h-7 w-7" />} iconClassName="text-[var(--primary)]">
            Meus Projetos
          </TitleWithIcon>
          <Text size="lead" className="max-w-[60ch] text-[var(--muted)]">
            Uma seleção de trabalhos que desenvolvi ao longo da minha carreira,
            variando de aplicações web completas a exibições interativas de arte.
          </Text>
        </Box>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => {
            const tech = [...project.frontend, ...project.backend].slice(0, 5);
            return (
              <Box
                key={project.id}
                className="flex-col border-4 border-[var(--border)] bg-[var(--bg-2)] shadow-[6px_6px_0_0_var(--border)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
              >
                <Box className="relative">
                  <img
                    src={project.cover}
                    alt={project.name}
                    loading="lazy"
                    className="aspect-[16/9] w-full border-b-4 border-[var(--border)] object-cover"
                  />
                  {project.category ? (
                    <span className="absolute left-3 top-3 border-2 border-[var(--border)] bg-[var(--accent)] px-2 py-1 text-[var(--accent-ink)]">
                      <Text as="span" size="monoXs" className="font-bold uppercase">
                        {project.category}
                      </Text>
                    </span>
                  ) : null}
                </Box>

                <Box className="flex flex-1 flex-col gap-4 p-5">
                  <Text as="h2" size="subheading" className="font-bold">
                    {project.name}
                  </Text>
                  <Text size="small" className="line-clamp-3 text-[var(--muted)]">
                    {project.description}
                  </Text>
                  <ul className="flex flex-wrap gap-1.5">
                    {tech.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/${locale}/projects/${project.slug}`}
                    className="mt-auto w-fit text-[var(--accent)]"
                  >
                    <Text as="span" size="small" className="font-bold">
                      Ver Detalhes →
                    </Text>
                  </a>
                </Box>
              </Box>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
