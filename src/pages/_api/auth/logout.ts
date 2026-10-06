import { getUserByAccessToken, revokeUserSessions } from "@/auth/auth.server";
import {
  appendClearedAuthCookies,
  readAccessToken,
} from "@/auth/cookies.server";
import { redirectWith, wantsJson } from "@/auth/http.server";

export async function POST(request: Request): Promise<Response> {
  const accessToken = readAccessToken(request);
  const user = accessToken ? getUserByAccessToken(accessToken) : null;
  if (user) revokeUserSessions(user.id);

  const headers = new Headers();
  appendClearedAuthCookies(headers);

  if (wantsJson(request)) {
    return Response.json({ ok: true }, { headers });
  }
  return redirectWith("/login", headers);
}
