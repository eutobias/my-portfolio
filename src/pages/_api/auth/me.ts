import { getUserByAccessToken } from "@/auth/auth.server";
import { readAccessToken } from "@/auth/cookies.server";

export async function GET(request: Request): Promise<Response> {
  const accessToken = readAccessToken(request);
  const user = accessToken ? getUserByAccessToken(accessToken) : null;
  if (!user) {
    return Response.json({ message: "Não autenticado." }, { status: 401 });
  }
  return Response.json({ user });
}
