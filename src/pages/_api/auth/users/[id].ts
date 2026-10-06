import type { ApiContext } from "waku/router";

import { getUserByAccessToken } from "@/auth/auth.server";
import { readAccessToken } from "@/auth/cookies.server";
import { readBody } from "@/auth/http.server";
import { deleteUser, getUser, updateUser } from "@/auth/users.server";

type Context = ApiContext<"/auth/users/[id]">;

function resolveId(params: Context["params"]): number | null {
  const id = Number(params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _request: Request,
  { params }: Context,
): Promise<Response> {
  const id = resolveId(params);
  if (id === null) {
    return Response.json({ message: "ID inválido." }, { status: 400 });
  }
  const user = getUser(id);
  if (!user) {
    return Response.json({ message: "Usuário não encontrado." }, { status: 404 });
  }
  return Response.json({ user });
}

async function update(
  request: Request,
  params: Context["params"],
): Promise<Response> {
  const id = resolveId(params);
  if (id === null) {
    return Response.json({ message: "ID inválido." }, { status: 400 });
  }

  const body = await readBody(request);
  const result = updateUser(id, body);
  if (result === null) {
    return Response.json({ message: "Usuário não encontrado." }, { status: 404 });
  }
  if (!result.ok) {
    return Response.json(
      { message: "Dados inválidos.", errors: result.errors },
      { status: 422 },
    );
  }
  return Response.json({ user: result.value });
}

export const PATCH = (request: Request, { params }: Context) =>
  update(request, params);

export const PUT = (request: Request, { params }: Context) =>
  update(request, params);

export async function DELETE(
  request: Request,
  { params }: Context,
): Promise<Response> {
  const id = resolveId(params);
  if (id === null) {
    return Response.json({ message: "ID inválido." }, { status: 400 });
  }

  const accessToken = readAccessToken(request);
  const requester = accessToken ? getUserByAccessToken(accessToken) : null;
  if (!requester) {
    return Response.json({ message: "Não autenticado." }, { status: 401 });
  }

  const result = deleteUser(id, requester.id);
  switch (result) {
    case "not_found":
      return Response.json(
        { message: "Usuário não encontrado." },
        { status: 404 },
      );
    case "self":
      return Response.json(
        { message: "Você não pode remover o próprio usuário." },
        { status: 409 },
      );
    case "last":
      return Response.json(
        { message: "Não é possível remover o último usuário." },
        { status: 409 },
      );
    default:
      return Response.json({ ok: true });
  }
}
