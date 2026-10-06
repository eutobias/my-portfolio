import { FiMail, FiMessageCircle, FiPhone, FiZap } from "react-icons/fi";
import type { PageProps } from "waku/router";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { ContactForm } from "@/components/site/contact-form";
import { TitleWithIcon } from "@/components/site/title-with-icon";
import { Shell } from "@/components/site/ui";
import { getNavigation } from "@/portfolio/portfolio.server";

const PHONE = "+55 21 96421-1891";
const WHATSAPP = "https://wa.me/5521964211891";

const iconBox = (tone: string) =>
  `flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[var(--border)] ${tone}`;

export default async function ContactPage({ locale }: PageProps<"/[locale]/contact">) {
  const nav = getNavigation(locale);

  return (
    <Shell>
      <div className="flex flex-col gap-10 py-12 md:py-16">
        <title>Contato - Tobias Taurian</title>

        <Box className="flex-col gap-4 border-b-4 border-[var(--border)] pb-6">
          <TitleWithIcon icon={<FiMail aria-hidden className="h-7 w-7" />} iconClassName="text-[var(--accent)]">
            Contato
          </TitleWithIcon>
          <Text size="lead" className="max-w-[60ch] text-[var(--muted)]">
            Tem alguma pergunta, proposta de projeto ou apenas quer bater um papo
            técnico? Sinta-se à vontade para me mandar uma mensagem!
          </Text>
        </Box>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Box className="flex-col gap-6">
            <Text as="h2" size="subheading" className="font-bold">
              Informações de Contato
            </Text>

            <Box className="flex-col gap-4">
              {nav.email ? (
                <a
                  href={`mailto:${nav.email}`}
                  className="flex items-center gap-4 border-4 border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-[4px_4px_0_0_var(--border)] transition-transform hover:-translate-y-0.5"
                >
                  <span className={iconBox("bg-[var(--primary)] text-[var(--primary-ink)]")}>
                    <FiMail aria-hidden className="h-5 w-5" />
                  </span>
                  <Box className="flex-col">
                    <Text as="span" size="monoXs" className="uppercase tracking-[0.14em] text-[var(--muted)]">
                      E-mail
                    </Text>
                    <Text as="span" size="body" className="font-bold">
                      {nav.email}
                    </Text>
                  </Box>
                </a>
              ) : null}

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-4 border-4 border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-[4px_4px_0_0_var(--border)] transition-transform hover:-translate-y-0.5"
              >
                <span className={iconBox("bg-[var(--secondary)] text-[var(--secondary-ink)]")}>
                  <FiPhone aria-hidden className="h-5 w-5" />
                </span>
                <Box className="flex-col">
                  <Text as="span" size="monoXs" className="uppercase tracking-[0.14em] text-[var(--muted)]">
                    Telefone
                  </Text>
                  <Text as="span" size="body" className="font-bold">
                    {PHONE}
                  </Text>
                </Box>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border-4 border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-[4px_4px_0_0_var(--border)] transition-transform hover:-translate-y-0.5"
              >
                <span className={iconBox("bg-[var(--accent)] text-[var(--accent-ink)]")}>
                  <FiMessageCircle aria-hidden className="h-5 w-5" />
                </span>
                <Box className="flex-col">
                  <Text as="span" size="monoXs" className="uppercase tracking-[0.14em] text-[var(--muted)]">
                    WhatsApp
                  </Text>
                  <Text as="span" size="body" className="font-bold">
                    Conversar no WhatsApp
                  </Text>
                </Box>
              </a>
            </Box>

            <Box className="items-start gap-3 border-4 border-[var(--border)] bg-[var(--highlight)] p-5 text-[var(--highlight-ink)] shadow-[4px_4px_0_0_var(--border)]">
              <FiZap aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <Box className="flex-col gap-1">
                <Text as="span" size="small" className="font-bold">
                  Tempo de Resposta
                </Text>
                <Text as="span" size="small">
                  Costumo responder a e-mails e mensagens em menos de 24 horas
                  úteis. Se for algo urgente, o WhatsApp é sempre o canal mais
                  rápido!
                </Text>
              </Box>
            </Box>
          </Box>

          <ContactForm />
        </div>
      </div>
    </Shell>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
