import { unstable_getHeaders as getHeaders } from "waku/router/server";

import { getUserByAccessToken } from "@/auth/auth.server";
import { ACCESS_COOKIE } from "@/auth/config";
import type { AuthUser } from "@/auth/config";
import { parseCookies } from "@/auth/cookies.server";

export function getCurrentUser(): AuthUser | null {
  try {
    const headers = getHeaders();
    const token = parseCookies(headers["cookie"] ?? "")[ACCESS_COOKIE];
    return token ? getUserByAccessToken(token) : null;
  } catch {
    return null;
  }
}
