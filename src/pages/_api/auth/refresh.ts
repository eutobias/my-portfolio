import { rotateSession } from "@/auth/auth.server";
import {
  appendAuthCookies,
  appendClearedAuthCookies,
  readRefreshToken,
} from "@/auth/cookies.server";
import { redirectWith, wantsJson } from "@/auth/http.server";

export async function POST(request: Request): Promise<Response> {
  const json = wantsJson(request);
  const refreshToken = readRefreshToken(request);
  const rotated = refreshToken ? rotateSession(refreshToken) : null;

  if (!rotated) {
    const headers = new Headers();
    appendClearedAuthCookies(headers);
    if (json) {
      return Response.json(
        { message: "Sessão expirada. Faça login novamente." },
        { status: 401, headers },
      );
    }
    return redirectWith("/login", headers);
  }

  const headers = new Headers();
  appendAuthCookies(headers, rotated.tokens);

  if (json) {
    return Response.json({ user: rotated.user }, { headers });
  }
  return redirectWith("/admin", headers);
}
