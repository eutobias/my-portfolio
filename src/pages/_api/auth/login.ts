import { createSession, verifyCredentials } from "@/auth/auth.server";
import { appendAuthCookies } from "@/auth/cookies.server";
import { readBody, redirectWith, wantsJson } from "@/auth/http.server";

export async function POST(request: Request): Promise<Response> {
  const body = await readBody(request);
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");
  const json = wantsJson(request);

  const user = email && password ? verifyCredentials(email, password) : null;

  if (!user) {
    if (json) {
      return Response.json(
        { message: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }
    return redirectWith("/login?error=invalid", new Headers());
  }

  const tokens = createSession(user.id);
  const headers = new Headers();
  appendAuthCookies(headers, tokens);

  if (json) {
    return Response.json({ user }, { headers });
  }
  return redirectWith("/admin", headers);
}
