import type { ApiContext } from "waku/router";

import {
  checkRelationTargets,
  deleteItem,
  getItem,
  updateItem,
} from "@/admin/db.server";
import { getCollection } from "@/admin/schema";
import { coerceInput } from "@/admin/validation";

type Context = ApiContext<"/payload/[collection]/[id]">;

function resolveCollection(params: Context["params"]) {
  const collection = getCollection(String(params.collection));
  const id = Number(params.id);
  if (!collection) {
    return {
      error: Response.json(
        { message: "Coleção não encontrada." },
        { status: 404 },
      ),
    } as const;
  }
  if (!Number.isInteger(id) || id <= 0) {
    return {
      error: Response.json({ message: "ID inválido." }, { status: 400 }),
    } as const;
  }
  return { collection, id } as const;
}

export async function GET(
  _request: Request,
  { params }: Context,
): Promise<Response> {
  const resolved = resolveCollection(params);
  if ("error" in resolved) return resolved.error;

  const item = getItem(resolved.collection, resolved.id);
  if (!item) {
    return Response.json({ message: "Item não encontrado." }, { status: 404 });
  }
  return Response.json({ item });
}

async function update(request: Request, params: Context["params"]) {
  const resolved = resolveCollection(params);
  if ("error" in resolved) return resolved.error;

  if (!getItem(resolved.collection, resolved.id)) {
    return Response.json({ message: "Item não encontrado." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "JSON inválido." }, { status: 400 });
  }

  const result = coerceInput(resolved.collection, body, { partial: true });
  if (!result.ok) {
    return Response.json(
      { message: "Dados inválidos.", errors: result.errors },
      { status: 422 },
    );
  }

  const relationErrors = checkRelationTargets(
    resolved.collection,
    result.values,
  );
  if (Object.keys(relationErrors).length > 0) {
    return Response.json(
      { message: "Dados inválidos.", errors: relationErrors },
      { status: 422 },
    );
  }

  const item = updateItem(resolved.collection, resolved.id, result.values);
  return Response.json({ item });
}

export const PATCH = (request: Request, { params }: Context) =>
  update(request, params);

export const PUT = (request: Request, { params }: Context) =>
  update(request, params);

export async function DELETE(
  _request: Request,
  { params }: Context,
): Promise<Response> {
  const resolved = resolveCollection(params);
  if ("error" in resolved) return resolved.error;

  if (resolved.collection.standalone) {
    return Response.json(
      {
        message:
          "Coleção standalone possui um único registro; ele não pode ser removido.",
      },
      { status: 405 },
    );
  }

  const removed = deleteItem(resolved.collection, resolved.id);
  if (!removed) {
    return Response.json({ message: "Item não encontrado." }, { status: 404 });
  }
  return Response.json({ ok: true });
}
