/**
 * Locale routing for the public site.
 *
 * All public pages live under `/[locale]`; this middleware redirects the bare
 * root and the legacy non-prefixed paths to the default locale.
 */
import type { MiddlewareHandler } from "hono";

import { defaultLocale } from "@/schemas";

const LEGACY_PREFIXES = [
  "/projects",
  "/about",
  "/contact",
  "/experience",
  "/skills",
];

const locale = (): MiddlewareHandler => {
  return async (c, next) => {
    const url = new URL(c.req.url);
    const path = url.pathname;

    if (path === "/") {
      return Response.redirect(new URL(`/${defaultLocale}`, url), 302);
    }

    if (
      LEGACY_PREFIXES.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`),
      )
    ) {
      return Response.redirect(
        new URL(`/${defaultLocale}${path}`, url),
        302,
      );
    }

    await next();
  };
};

export default locale;
