import { createItem } from "@/admin/db.server";
import { getCollection } from "@/admin/schema";
import { coerceInput } from "@/admin/validation";

/**
 * Public endpoint for the contact form. Stores the message in the `messages`
 * collection (visible in the admin). Not authentication-gated on purpose.
 */
export async function POST(request: Request): Promise<Response> {
  const collection = getCollection("messages");
  if (!collection) {
    return Response.json({ message: "Coleção indisponível." }, { status: 404 });
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

  createItem(collection, result.values);
  return Response.json({ ok: true }, { status: 201 });
}
