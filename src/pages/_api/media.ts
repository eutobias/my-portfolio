import { MediaError, deleteByUrl, saveUpload } from "@/admin/media.server";
import { getCollection } from "@/admin/schema";
import type { FieldDef } from "@/admin/types";

function resolveMediaField(searchParams: URLSearchParams): FieldDef | null {
  const collection = getCollection(searchParams.get("collection") ?? "");
  const name = searchParams.get("field") ?? "";
  if (!collection) return null;
  const field = collection.fields.find(
    (entry) =>
      entry.name === name &&
      (entry.type === "media" || entry.type === "media-list"),
  );
  return field ?? null;
}

export async function POST(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const field = resolveMediaField(url.searchParams);
  if (!field) {
    return Response.json(
      { message: "Campo de mídia não encontrado." },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ message: "Upload inválido." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json(
      { message: "Nenhum arquivo enviado." },
      { status: 400 },
    );
  }

  try {
    const media = await saveUpload(file, field);
    return Response.json({ media }, { status: 201 });
  } catch (error) {
    if (error instanceof MediaError) {
      return Response.json(
        { message: error.message },
        { status: error.status },
      );
    }
    throw error;
  }
}

export async function DELETE(request: Request): Promise<Response> {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) {
    return Response.json({ message: "URL ausente." }, { status: 400 });
  }
  deleteByUrl(target);
  return Response.json({ ok: true });
}
