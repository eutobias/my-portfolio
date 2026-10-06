import { FiBriefcase, FiCode, FiUser } from "react-icons/fi";
import type { PageProps } from "waku/router";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { Chip } from "@/components/site/chip";
import { Panel } from "@/components/site/panel";
import { TitleWithIcon } from "@/components/site/title-with-icon";
import { Shell } from "@/components/site/ui";
import { getExperiences, getSkills } from "@/portfolio/portfolio.server";

const NUMBERS = [
  { label: "Anos de Exp", value: "18+" },
  { label: "Tecnologias", value: "30+" },
  { label: "Projetos Entregues", value: "100+" },
  { label: "Liderança de Times", value: "Até 15 Devs" },
];

export default async function AboutPage({ locale }: PageProps<"/[locale]/about">) {
  const experiences = getExperiences(locale);
  const skills = getSkills(locale);

  return (
    <Shell>
      <div className="flex flex-col gap-12 py-12 md:py-16">
        <title>Sobre Mim - Tobias Taurian</title>

        <Box className="flex-col gap-4 border-b-4 border-[var(--border)] pb-6">
          <TitleWithIcon icon={<FiUser aria-hidden className="h-7 w-7" />} iconClassName="text-[var(--secondary)]">
            Sobre Mim
          </TitleWithIcon>
          <Text size="lead" className="max-w-[60ch] text-[var(--muted)]">
            Conheça um pouco mais sobre minha história, minhas habilidades
            técnicas e as empresas por onde passei.
          </Text>
        </Box>

        {/* Bio + numbers */}
        <section className="flex flex-col gap-6">
          <TitleWithIcon
            icon={<span aria-hidden className="font-mono text-[var(--primary)]">&gt;_</span>}
            size="subheading"
          >
            Resumo Profissional
          </TitleWithIcon>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <Panel className="gap-4 p-6">
              <Text size="small" className="text-[var(--muted)]">
                Sou um desenvolvedor sênior com mais de{" "}
                <span className="bg-[var(--primary)] px-1 font-bold text-[var(--primary-ink)]">
                  18 anos de experiência
                </span>{" "}
                especializado no ecossistema de JavaScript, TypeScript, React,
                Node.js e arquiteturas modernas de nuvem.
              </Text>
              <Text size="small" className="text-[var(--muted)]">
                Minha paixão é construir soluções escaláveis, desde
                microsserviços de alta performance e APIs REST robustas até
                aplicações de inteligência artificial de última geração (LLMs e
                agentes inteligentes).
              </Text>
              <Text size="small" className="text-[var(--muted)]">
                Tenho uma trajetória sólida liderando equipes técnicas de alta
                performance, arquitetando plataformas de e-commerce globais,
                criando aplicativos móveis, integrando sistemas corporativos
                complexos e até desenvolvendo exibições interativas de arte em
                museus de prestígio nacional.
              </Text>
            </Panel>

            <Box className="flex-col gap-4 border-4 border-[var(--border)] bg-[var(--accent)] p-6 text-[var(--accent-ink)] shadow-[6px_6px_0_0_var(--border)]">
              <Text as="h3" size="cardTitle" className="font-bold">
                Tobias em Números
              </Text>
              <Box className="flex-col gap-3">
                {NUMBERS.map((item) => (
                  <Box
                    key={item.label}
                    className="items-center justify-between gap-3 border-b-2 border-[var(--border)] pb-2 last:border-0 last:pb-0"
                  >
                    <Text as="span" size="monoSm">
                      {item.label}:
                    </Text>
                    <span className="border-2 border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[var(--ink)]">
                      <Text as="span" size="monoXs" className="font-bold">
                        {item.value}
                      </Text>
                    </span>
                  </Box>
                ))}
              </Box>
            </Box>
          </div>
        </section>

        {/* Skills */}
        <section className="flex flex-col gap-6">
          <TitleWithIcon
            icon={<FiCode aria-hidden className="h-6 w-6" />}
            size="subheading"
            iconClassName="text-[var(--secondary)]"
          >
            Habilidades Técnicas
          </TitleWithIcon>

          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <Panel key={group.id} className="gap-4 p-5" shadow="md">
                <span className="w-fit border-2 border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[var(--secondary-ink)]">
                  <Text as="span" size="monoSm" className="font-bold">
                    {group.title}
                  </Text>
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section className="flex flex-col gap-6">
          <TitleWithIcon
            icon={<FiBriefcase aria-hidden className="h-6 w-6" />}
            size="subheading"
            iconClassName="text-[var(--highlight)]"
          >
            Experiência Profissional
          </TitleWithIcon>

          <ol className="flex flex-col gap-6">
            {experiences.map((experience) => (
              <li key={experience.id} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-6 hidden h-5 w-5 shrink-0 rounded-full border-4 border-[var(--border)] bg-[var(--bg)] sm:block"
                />
                <Panel className="flex-1 gap-4 p-5" shadow="md">
                  <Box className="flex-wrap items-start justify-between gap-3">
                    <Box className="flex-col gap-1">
                      <Text as="h3" size="cardTitle" className="font-bold">
                        {experience.title}
                      </Text>
                      <Text as="span" size="small" className="text-[var(--primary)]">
                        {experience.company}
                      </Text>
                    </Box>
                    <span className="border-2 border-[var(--border)] bg-[var(--highlight)] px-2 py-1 text-[var(--highlight-ink)]">
                      <Text as="span" size="monoXs" className="font-bold">
                        {experience.period}
                      </Text>
                    </span>
                  </Box>
                  <ul className="flex flex-col gap-2 border-t-2 border-[var(--border)] pt-3">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span aria-hidden className="text-[var(--primary)]">
                          •
                        </span>
                        <Text as="span" size="small" className="text-[var(--muted)]">
                          {bullet}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Shell>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
