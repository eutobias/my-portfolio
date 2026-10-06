import type { PageProps } from "waku/router";
import { unstable_notFound as notFound } from "waku/router/server";
import {
  FiAward,
  FiCalendar,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { BrutalButton } from "@/components/site/brutal-button";
import { Chip } from "@/components/site/chip";
import { Panel } from "@/components/site/panel";
import { TitleWithIcon } from "@/components/site/title-with-icon";
import { Shell } from "@/components/site/ui";
import { getProjectBySlug } from "@/portfolio/portfolio.server";

type MetaProps = { label: string; value: string };

const Meta = ({ label, value }: MetaProps) => (
  <Box className="flex-col gap-0.5">
    <Text as="span" size="monoXs" className="uppercase tracking-[0.12em] text-[var(--muted)]">
      {label}
    </Text>
    <Text as="span" size="small" className="font-bold">
      {value}
    </Text>
  </Box>
);

export default async function ProjectPage({
  locale,
  slug,
}: PageProps<"/[locale]/projects/[slug]">) {
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    notFound();
  }

  const tech = [...project.frontend, ...project.backend];

  return (
    <Shell>
      <article className="flex flex-col gap-8 py-10 md:py-14">
        <title>{`${project.name} - Tobias Taurian`}</title>

        <a href={`/${locale}/projects`} className="w-fit">
          <BrutalButton as="span" variant="secondary" size="sm">
            ← Voltar
          </BrutalButton>
        </a>

        {/* Hero + gallery strip */}
        <Box className="flex-col gap-4">
          <Box className="border-4 border-[var(--border)] bg-[var(--accent)] shadow-[10px_10px_0_0_var(--primary)]">
            <img
              src={project.cover}
              alt={project.name}
              loading="eager"
              className="aspect-[16/9] w-full object-cover"
            />
          </Box>

          {project.gallery.length > 0 ? (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {project.gallery.slice(0, 5).map((image) => (
                <li
                  key={image}
                  className="border-4 border-[var(--border)] bg-[var(--bg-2)] shadow-[3px_3px_0_0_var(--border)]"
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </Box>

        {/* Title */}
        <Box className="flex-col gap-3">
          <Text as="h1" size="heading" className="text-[var(--accent)]">
            {project.name}
          </Text>
          {project.subtitle ? (
            <Text size="small" className="text-[var(--muted)]">
              {project.subtitle}
            </Text>
          ) : null}
        </Box>

        {/* Description */}
        <Box className="border-4 border-[var(--border)] bg-[var(--bg-2)] p-6 shadow-[6px_6px_0_0_var(--border)]">
          <Text size="body" className="text-[var(--ink)]">
            {project.description}
          </Text>
        </Box>

        {/* Meta columns */}
        <div className="grid gap-6 md:grid-cols-2">
          <Box className="flex-col gap-6">
            {tech.length > 0 ? (
              <Panel className="gap-4 p-5">
                <TitleWithIcon
                  icon={<FiCode aria-hidden className="h-5 w-5" />}
                  size="cardTitle"
                  iconClassName="text-[var(--accent)]"
                >
                  Tecnologias
                </TitleWithIcon>
                <ul className="flex flex-wrap gap-1.5">
                  {tech.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Panel>
            ) : null}

            {project.role || project.teamSize ? (
              <Panel className="gap-4 p-5">
                <TitleWithIcon
                  icon={<FiUsers aria-hidden className="h-5 w-5" />}
                  size="cardTitle"
                  iconClassName="text-[var(--secondary)]"
                >
                  Equipe
                </TitleWithIcon>
                <Box className="flex-col gap-3">
                  {project.role ? <Meta label="Meu papel" value={project.role} /> : null}
                  {project.teamSize ? (
                    <Meta label="Tamanho da equipe" value={project.teamSize} />
                  ) : null}
                </Box>
              </Panel>
            ) : null}
          </Box>

          <Box className="flex-col gap-4">
            {project.year || project.client ? (
              <Panel className="gap-4 p-5">
                <TitleWithIcon
                  icon={<FiCalendar aria-hidden className="h-5 w-5" />}
                  size="cardTitle"
                  iconClassName="text-[var(--accent)]"
                >
                  Timeline
                </TitleWithIcon>
                <Box className="flex-col gap-3">
                  {project.year ? <Meta label="Data" value={project.year} /> : null}
                  {project.client ? <Meta label="Cliente" value={project.client} /> : null}
                </Box>
              </Panel>
            ) : null}

            {project.url ? (
              <BrutalButton
                as="a"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="w-full justify-center"
                icon={<FiExternalLink aria-hidden />}
              >
                Visitar Projeto
              </BrutalButton>
            ) : null}
            {project.repo ? (
              <BrutalButton
                as="a"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="w-full justify-center"
                icon={<FiGithub aria-hidden />}
              >
                Ver Código
              </BrutalButton>
            ) : null}
          </Box>
        </div>

        {/* Highlights */}
        {project.highlights.length > 0 ? (
          <Box className="flex-col gap-5">
            <TitleWithIcon
              icon={<FiAward aria-hidden className="h-6 w-6" />}
              iconClassName="text-[var(--secondary)]"
            >
              Destaques
            </TitleWithIcon>
            <ul className="grid gap-3 md:grid-cols-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="border-4 border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-[4px_4px_0_0_var(--border)]"
                >
                  <Text as="span" size="small" className="font-bold">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </Box>
        ) : null}

        {/* Challenges */}
        {project.challenges.length > 0 ? (
          <Box className="flex-col gap-5">
            <TitleWithIcon
              icon={<FiTarget aria-hidden className="h-6 w-6" />}
              iconClassName="text-[var(--accent)]"
            >
              Desafios
            </TitleWithIcon>
            <Box className="gap-5 border-4 border-[var(--border)] bg-[var(--bg-2)] p-5 shadow-[4px_4px_0_0_var(--border)]">
              <ol className="flex flex-col gap-3">
                {project.challenges.map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
                      <Text as="span" size="monoSm" className="font-bold">
                        {index + 1}
                      </Text>
                    </span>
                    <Text as="span" size="small" className="text-[var(--ink)]">
                      {item}
                    </Text>
                  </li>
                ))}
              </ol>
            </Box>
          </Box>
        ) : null}

        {/* Results */}
        {project.results.length > 0 ? (
          <Box className="flex-col gap-5">
            <TitleWithIcon
              icon={<FiTrendingUp aria-hidden className="h-6 w-6" />}
              iconClassName="text-[var(--primary)]"
            >
              Resultados
            </TitleWithIcon>
            <ul className="grid gap-3 md:grid-cols-2">
              {project.results.map((item) => (
                <li
                  key={item}
                  className="border-4 border-[var(--border)] bg-[var(--primary)] p-4 text-[var(--primary-ink)] shadow-[4px_4px_0_0_var(--border)]"
                >
                  <Text as="span" size="small" className="font-bold">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </Box>
        ) : null}
      </article>
    </Shell>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
