import type { ApiContext } from "waku/router";

import {
  checkRelationTargets,
  createItem,
  getStandalone,
  listItems,
  saveStandalone,
} from "@/admin/db.server";
import { getCollection } from "@/admin/schema";
import { coerceInput } from "@/admin/validation";

function notFound() {
  return Response.json({ message: "Coleção não encontrada." }, { status: 404 });
}

function methodNotAllowed(message: string) {
  return Response.json({ message }, { status: 405 });
}

export async function GET(
  request: Request,
  { params }: ApiContext<"/payload/[collection]">,
): Promise<Response> {
  const collection = getCollection(String(params.collection));
  if (!collection) return notFound();

  if (collection.standalone) {
    return Response.json({ item: getStandalone(collection) });
  }

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1") || 1;
  const limit = Number(url.searchParams.get("limit") ?? "10") || 10;
  const q = url.searchParams.get("q") ?? "";

  return Response.json(listItems(collection, { page, limit, q }));
}

export async function POST(
  request: Request,
  { params }: ApiContext<"/payload/[collection]">,
): Promise<Response> {
  const collection = getCollection(String(params.collection));
  if (!collection) return notFound();

  if (collection.standalone) {
    return methodNotAllowed(
      "Coleção standalone possui um único registro; use PATCH para atualizá-lo.",
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "JSON inválido." }, { status: 400 });
  }

  const result = coerceInput(collection, body, { partial: false });
  if (!result.ok) {
    return Response.json(
      { message: "Dados inválidos.", errors: result.errors },
      { status: 422 },
    );
  }

  const relationErrors = checkRelationTargets(collection, result.values);
  if (Object.keys(relationErrors).length > 0) {
    return Response.json(
      { message: "Dados inválidos.", errors: relationErrors },
      { status: 422 },
    );
  }

  return Response.json(
    { item: createItem(collection, result.values) },
    { status: 201 },
  );
}

/** Update the single record of a standalone collection. */
export async function PATCH(
  request: Request,
  { params }: ApiContext<"/payload/[collection]">,
): Promise<Response> {
  const collection = getCollection(String(params.collection));
  if (!collection) return notFound();

  if (!collection.standalone) {
    return methodNotAllowed(
      "Use PATCH /payload/:collection/:id para atualizar itens desta coleção.",
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "JSON inválido." }, { status: 400 });
  }

  const result = coerceInput(collection, body, { partial: true });
  if (!result.ok) {
    return Response.json(
      { message: "Dados inválidos.", errors: result.errors },
      { status: 422 },
    );
  }

  const relationErrors = checkRelationTargets(collection, result.values);
  if (Object.keys(relationErrors).length > 0) {
    return Response.json(
      { message: "Dados inválidos.", errors: relationErrors },
      { status: 422 },
    );
  }

  return Response.json({ item: saveStandalone(collection, result.values) });
}
