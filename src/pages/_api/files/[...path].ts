import type { ApiContext } from "waku/router";

import { contentTypeFor, readUpload } from "@/admin/media.server";

type Context = ApiContext<"/files/[...path]">;

export async function GET(
  _request: Request,
  { params }: Context,
): Promise<Response> {
  const raw = params.path;
  const name = Array.isArray(raw) ? raw.join("/") : String(raw ?? "");

  const data = readUpload(name);
  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": contentTypeFor(name),
      "Content-Length": String(data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      // Neutralize any scriptable content that slips through.
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
