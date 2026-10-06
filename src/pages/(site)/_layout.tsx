import type { ReactNode } from "react";
import { unstable_getRequest as getRequest } from "waku/router/server";

import { Box } from "@/components/box";
import { Text } from "@/components/text";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { Shell, SocialIcon } from "@/components/site/ui";
import { getNavigation } from "@/portfolio/portfolio.server";
import { localeFromPath, localeHref, stripLocale } from "@/portfolio/locale";
import { locales } from "@/schemas";

const FOOTER_TONES = [
  "bg-[var(--primary)] text-[var(--primary-ink)]",
  "bg-[var(--secondary)] text-[var(--secondary-ink)]",
  "bg-[var(--accent)] text-[var(--accent-ink)]",
];

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = (() => {
    try {
      return new URL(getRequest().url).pathname.replace(/\/+$/, "") || "/";
    } catch {
      return "/";
    }
  })();
  const locale = localeFromPath(pathname);
  const localPath = stripLocale(pathname);
  const nav = getNavigation(locale);

  const isActive = (href: string) => {
    const clean = href.replace(/\/+$/, "") || "/";
    if (clean === "/") return localPath === "/";
    return localPath === clean || localPath.startsWith(`${clean}/`);
  };

  const switchHref = (code: string) =>
    localeHref(code, localPath === "/" ? "/" : localPath);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b-4 border-[var(--border)] bg-[var(--bg)]">
        <Shell>
          <div className="flex h-20 items-center justify-between gap-4">
            <a
              href={`/${locale}`}
              className="shrink-0 border-4 border-[var(--border)] bg-[var(--primary)] px-4 py-2 text-[var(--primary-ink)] shadow-[4px_4px_0_0_var(--border)]"
            >
              <Text as="span" size="mono" className="font-bold lowercase">
                {nav.siteName}
              </Text>
            </a>

            <Box className="min-w-0 items-center gap-2 overflow-x-auto">
              <nav aria-label="Principal" className="flex items-center gap-2">
                {nav.main.map((item) => (
                  <a
                    key={item.id}
                    href={localeHref(locale, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`shrink-0 border-2 border-[var(--border)] px-3 py-2 shadow-[2px_2px_0_0_var(--border)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      isActive(item.href)
                        ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                        : "bg-[var(--secondary)] text-[var(--secondary-ink)]"
                    }`}
                  >
                    <Text as="span" size="monoSm" className="font-bold uppercase">
                      {item.label}
                    </Text>
                  </a>
                ))}
              </nav>

              <div
                className="hidden shrink-0 items-center border-2 border-[var(--border)] sm:flex"
                role="group"
                aria-label="Idioma"
              >
                {locales.map((entry, index) => {
                  const active = entry.code === locale;
                  return (
                    <a
                      key={entry.code}
                      href={switchHref(entry.code)}
                      aria-current={active ? "true" : undefined}
                      title={entry.label}
                      className={`px-2 py-2 ${
                        index > 0 ? "border-l-2 border-[var(--border)]" : ""
                      } ${
                        active
                          ? "bg-[var(--primary)] text-[var(--primary-ink)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      <Text as="span" size="monoSm" className="font-bold">
                        {entry.code.toUpperCase()}
                      </Text>
                    </a>
                  );
                })}
              </div>
            </Box>
          </div>
        </Shell>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-4 border-[var(--border)]">
        <Shell>
          <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
            <Box className="flex-col gap-1">
              <Text as="span" size="cardTitle" className="font-bold">
                {nav.ownerName}
              </Text>
              <Text as="span" size="small" className="text-[var(--muted)]">
                {nav.tagline}
              </Text>
            </Box>

            <div className="w-fit border-2 border-[var(--border)] bg-[var(--highlight)] px-4 py-2 shadow-[2px_2px_0_0_var(--border)]">
              <Text
                as="span"
                size="monoSm"
                className="font-bold text-[var(--highlight-ink)]"
              >
                © 2026 {nav.siteName} • Todos os direitos reservados
              </Text>
            </div>

            <ul className="flex items-center gap-2">
              {nav.footer.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={`flex h-11 w-11 items-center justify-center border-4 border-[var(--border)] shadow-[2px_2px_0_0_var(--border)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      FOOTER_TONES[index % FOOTER_TONES.length]
                    }`}
                  >
                    <SocialIcon name={item.icon || item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </footer>

      <ThemeSwitcher />
    </div>
  );
}

// Reads navigation (DB-backed) and the request path for active links.
export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
