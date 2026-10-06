/**
 * Auth constants shared by server code and middleware.
 *
 * Tokens are opaque random strings stored (hashed) in SQLite — no JWT. They
 * travel as httpOnly cookies and are rotated by `src/middleware/auth.ts`.
 */

export const ACCESS_COOKIE = "mp_access";
export const REFRESH_COOKIE = "mp_refresh";

/** Authenticated user shape, safe to import from client components (type-only). */
export type AuthUser = {
  id: number;
  email: string;
};

/** Admin-facing user record (no password/hash). */
export type UserSummary = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};

/** Access token lifetime: 30 minutes. */
export const ACCESS_TTL_SECONDS = 30 * 60;
/** Refresh token lifetime: 24 hours. */
export const REFRESH_TTL_SECONDS = 24 * 60 * 60;

export const ACCESS_TTL_MS = ACCESS_TTL_SECONDS * 1000;
export const REFRESH_TTL_MS = REFRESH_TTL_SECONDS * 1000;

/**
 * Whether cookies get the `Secure` flag. Enabled in production, but can be
 * forced off (e.g. testing a production build over plain http).
 */
export const COOKIE_SECURE =
  process.env.AUTH_COOKIE_SECURE === "true" ||
  (process.env.AUTH_COOKIE_SECURE !== "false" &&
    process.env.NODE_ENV === "production");

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS", "TRACE"]);

export function isSafeMethod(method: string): boolean {
  return SAFE_METHODS.has(method.toUpperCase());
}

/** Paths that require an authenticated session. */
export function isProtectedPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/payload" ||
    pathname.startsWith("/payload/") ||
    pathname === "/auth/users" ||
    pathname.startsWith("/auth/users/") ||
    pathname === "/media" ||
    pathname === "/backup"
  );
}

/** Protected paths that should answer with JSON 401 instead of a redirect. */
export function isApiPath(pathname: string): boolean {
  return (
    pathname === "/payload" ||
    pathname.startsWith("/payload/") ||
    pathname === "/auth/users" ||
    pathname.startsWith("/auth/users/") ||
    pathname === "/media" ||
    pathname === "/backup"
  );
}
