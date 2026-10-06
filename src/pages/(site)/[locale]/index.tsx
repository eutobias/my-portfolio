import { FiArrowRight, FiCloud, FiMonitor, FiServer, FiAward, FiFolder } from "react-icons/fi";
import type { PageProps } from "waku/router";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { BrutalButton } from "@/components/site/brutal-button";
import { TitleWithIcon } from "@/components/site/title-with-icon";
import { Shell } from "@/components/site/ui";
import { getNavigation, getProjects } from "@/portfolio/portfolio.server";

const PILLARS = [
  {
    icon: <FiMonitor aria-hidden className="h-6 w-6" />,
    title: "Front-End Engineering",
    body: "Desenvolvimento de aplicações ricas, interfaces responsivas e experiências de usuário excepcionais com React, Next.js e TypeScript.",
    box: "bg-[var(--secondary)] text-[var(--secondary-ink)]",
    shadow: "shadow-[6px_6px_0_0_var(--secondary)]",
  },
  {
    icon: <FiServer aria-hidden className="h-6 w-6" />,
    title: "Back-End & APIs",
    body: "Arquitetura de microsserviços robustos e APIs de alta performance com Node.js, Express, NestJS e Go.",
    box: "bg-[var(--primary)] text-[var(--primary-ink)]",
    shadow: "shadow-[6px_6px_0_0_var(--primary)]",
  },
  {
    icon: <FiCloud aria-hidden className="h-6 w-6" />,
    title: "DevOps & Cloud",
    body: "Implantação de esteiras CI/CD eficientes, containerização com Docker, orquestração com Kubernetes e infraestrutura AWS.",
    box: "bg-[var(--accent)] text-[var(--accent-ink)]",
    shadow: "shadow-[6px_6px_0_0_var(--accent)]",
  },
];

const TERMINAL = [
  { prompt: "$", command: "npm install expertise" },
  { prompt: ">", command: "React, Node.js, TypeScript" },
  { prompt: ">", command: "Go, Python, AWS, Docker" },
];

export default async function HomePage({ locale }: PageProps<"/[locale]">) {
  const projects = getProjects(locale);
  const nav = getNavigation(locale);
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col">
      <title>{`${nav.ownerName} - Full-Stack Developer`}</title>

      {/* Hero */}
      <section className="border-b-4 border-[var(--border)]">
        <Shell>
          <div className="grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
            <Box className="flex-col items-start gap-6">
              <Box className="w-fit items-center gap-2 border-2 border-[var(--border)] bg-[var(--accent)] px-3 py-1.5 text-[var(--accent-ink)] shadow-[2px_2px_0_0_var(--border)]">
                <Text as="span" size="monoSm" className="font-bold uppercase">
                  18+ Anos de Experiência
                </Text>
              </Box>

              <Text
                as="h1"
                size="display"
                className="font-extrabold uppercase leading-[1.05]"
              >
                Olá, eu sou o
                <br />
                <span className="text-[var(--primary)] underline decoration-[var(--primary)] decoration-wavy decoration-4 underline-offset-[10px]">
                  {nav.ownerName}
                </span>
              </Text>

              <Box className="items-stretch gap-4">
                <span
                  aria-hidden
                  className="w-1.5 shrink-0 bg-[var(--secondary)]"
                />
                <Text size="lead" className="max-w-[46ch] text-[var(--muted)]">
                  Desenvolvedor Full-Stack Sênior focado em construir soluções
                  altamente escaláveis, arquiteturas robustas e interfaces de
                  altíssimo impacto visual.
                </Text>
              </Box>

              <Box className="flex-wrap items-center gap-4">
                <BrutalButton
                  as="a"
                  href={`/${locale}/projects`}
                  variant="primary"
                  icon={<FiArrowRight aria-hidden />}
                >
                  Ver Meus Projetos
                </BrutalButton>
                <BrutalButton as="a" href={`/${locale}/contact`} variant="secondary">
                  Fale Comigo
                </BrutalButton>
              </Box>
            </Box>

            <Box className="flex-col border-4 border-[var(--border)] bg-[var(--bg-2)] p-6 shadow-[10px_10px_0_0_var(--primary)]">
              <img
                src="/images/logo.png"
                alt={`Avatar de ${nav.ownerName}`}
                className="mx-auto h-32 w-32 rounded-full border-4 border-[var(--border)] bg-[var(--secondary)] object-cover"
              />
              <Text
                as="h2"
                size="cardTitle"
                className="mt-4 text-center font-bold"
              >
                {nav.ownerName}
              </Text>
              <Text
                as="p"
                size="monoSm"
                className="text-center text-[var(--primary)]"
              >
                @eutobias
              </Text>

              <Box className="mt-5 flex-col gap-1.5 border-2 border-[var(--border)] bg-[var(--bg)] p-4">
                {TERMINAL.map((line, index) => (
                  <Text
                    key={line.command}
                    as="p"
                    size="monoSm"
                    className={index === 0 ? "text-[var(--accent)]" : "text-[var(--ink)]"}
                  >
                    <span aria-hidden className="mr-2">
                      {line.prompt}
                    </span>
                    {line.command}
                  </Text>
                ))}
              </Box>
            </Box>
          </div>
        </Shell>
      </section>

      {/* Pillars */}
      <section className="border-b-4 border-[var(--border)]">
        <Shell>
          <div className="flex flex-col gap-8 py-12 md:py-16">
            <TitleWithIcon icon={<FiAward aria-hidden className="h-6 w-6" />}>
              O que eu faço de melhor
            </TitleWithIcon>

            <div className="grid gap-6 md:grid-cols-3">
              {PILLARS.map((pillar) => (
                <Box
                  key={pillar.title}
                  className={`flex-col gap-4 border-4 border-[var(--border)] bg-[var(--bg-2)] p-6 ${pillar.shadow}`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] ${pillar.box}`}
                  >
                    {pillar.icon}
                  </span>
                  <Text as="h3" size="cardTitle" className="font-bold">
                    {pillar.title}
                  </Text>
                  <Text size="small" className="text-[var(--muted)]">
                    {pillar.body}
                  </Text>
                </Box>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* Featured projects */}
      <section>
        <Shell>
          <div className="flex flex-col gap-8 py-12 md:py-16">
            <Box className="items-center justify-between gap-4">
              <TitleWithIcon icon={<FiFolder aria-hidden className="h-6 w-6" />} iconClassName="text-[var(--primary)]">
                Projetos em Destaque
              </TitleWithIcon>
              <BrutalButton as="a" href={`/${locale}/projects`} variant="highlight" size="sm">
                Ver Todos
              </BrutalButton>
            </Box>

            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((project) => (
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
                  <Box className="flex-1 flex-col gap-3 p-5">
                    <Text as="h3" size="cardTitle" className="font-bold">
                      {project.name}
                    </Text>
                    <Text size="small" className="line-clamp-3 text-[var(--muted)]">
                      {project.description}
                    </Text>
                    <a
                      href={`/${locale}/projects/${project.slug}`}
                      className="mt-auto w-fit text-[var(--primary)]"
                    >
                      <Text as="span" size="small" className="font-bold">
                        Mais detalhes →
                      </Text>
                    </a>
                  </Box>
                </Box>
              ))}
            </div>
          </div>
        </Shell>
      </section>
    </div>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
