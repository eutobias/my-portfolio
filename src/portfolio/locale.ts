/**
 * Locale helpers for the public site.
 *
 * URLs are fully prefixed (`/pt/...`, `/en/...`); `/` is redirected to the
 * default locale by `src/middleware/locale.ts`.
 */
import { defaultLocale, locales } from "@/schemas";

export function isLocale(value: string | undefined): boolean {
  return Boolean(value && locales.some((locale) => locale.code === value));
}

/** Locale encoded in the first path segment, or the default. */
export function localeFromPath(pathname: string): string {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

/** Pathname without its locale prefix (always starts with `/`). */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = parts.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/** Prefix an internal href with the locale. External/absolute URLs pass through. */
export function localeHref(locale: string, href: string): string {
  if (!href || /^[a-z]+:\/\//i.test(href) || href.startsWith("#")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}
