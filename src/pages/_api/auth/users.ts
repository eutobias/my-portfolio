import { createUser, listUsers } from "@/auth/users.server";
import { readBody } from "@/auth/http.server";

export async function GET(): Promise<Response> {
  return Response.json({ users: listUsers() });
}

export async function POST(request: Request): Promise<Response> {
  const body = await readBody(request);
  const result = createUser(body);
  if (!result.ok) {
    return Response.json(
      { message: "Dados inválidos.", errors: result.errors },
      { status: 422 },
    );
  }
  return Response.json({ user: result.value }, { status: 201 });
}
