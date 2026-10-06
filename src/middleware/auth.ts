/**
 * Authentication gate + transparent refresh, implemented as Hono middleware.
 *
 * - Protects `/admin` and `/payload/*` (see `isProtectedPath`).
 * - Valid access cookie => continues.
 * - Expired access but valid refresh => rotates the session (delete-all + new
 *   pair) and re-issues cookies. API paths continue; page renders get a 303 to
 *   the same URL so Server Components see the fresh access cookie.
 * - Otherwise: JSON 401 for API paths, 307 redirect to `/login` for pages.
 *
 * Cookies are appended to the final `Response`, since Hono loses prepared
 * `Set-Cookie` headers once a downstream handler returns its own response.
 */
import type { MiddlewareHandler } from "hono";

import { getUserByAccessToken, rotateSession } from "@/auth/auth.server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  isApiPath,
  isProtectedPath,
  isSafeMethod,
} from "@/auth/config";
import {
  appendAuthCookies,
  appendClearedAuthCookies,
  parseCookies,
} from "@/auth/cookies.server";

/** Reject cross-origin unsafe requests (CSRF defense-in-depth). */
function isCrossOrigin(req: { method: string; header: (name: string) => string | undefined }): boolean {
  if (isSafeMethod(req.method)) return false;
  const origin = req.header("origin");
  if (!origin) return false;
  const host = req.header("host");
  if (!host) return true;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

const auth = (): MiddlewareHandler => {
  return async (c, next) => {
    const url = new URL(c.req.url);
    if (!isProtectedPath(url.pathname)) return next();

    if (isCrossOrigin(c.req)) {
      return c.json({ message: "Origem não permitida." }, 403);
    }

    const jar = parseCookies(c.req.header("cookie"));
    const accessToken = jar[ACCESS_COOKIE];
    const user = accessToken ? getUserByAccessToken(accessToken) : null;
    if (user) return next();

    const refreshToken = jar[REFRESH_COOKIE];
    const rotated = refreshToken ? rotateSession(refreshToken) : null;

    if (rotated) {
      // API callers get fresh cookies and continue.
      if (isApiPath(url.pathname)) {
        await next();
        if (c.res) {
          const headers = new Headers(c.res.headers);
          appendAuthCookies(headers, rotated.tokens);
          c.res = new Response(c.res.body, {
            status: c.res.status,
            statusText: c.res.statusText,
            headers,
          });
        }
        return;
      }
      // Page renders are re-requested so Server Components see the fresh
      // access cookie instead of the stale one from this request.
      const headers = new Headers();
      appendAuthCookies(headers, rotated.tokens);
      headers.set("Location", `${url.pathname}${url.search}`);
      return new Response(null, { status: 303, headers });
    }

    const headers = new Headers();
    appendClearedAuthCookies(headers);

    if (isApiPath(url.pathname)) {
      headers.set("Content-Type", "application/json; charset=utf-8");
      return new Response(JSON.stringify({ message: "Não autenticado." }), {
        status: 401,
        headers,
      });
    }

    headers.set(
      "Location",
      `/login?next=${encodeURIComponent(`${url.pathname}${url.search}`)}`,
    );
    return new Response(null, { status: 307, headers });
  };
};

export default auth;
