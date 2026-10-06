/**
 * Backup API.
 *
 * - `GET /backup`                  → list stored backups
 * - `GET /backup?name=<file>`      → download a stored backup
 * - `GET /backup?latest=1`         → create + download a fresh backup
 * - `POST /backup`                 → create a stored backup
 * - `PUT /backup`                  → restore the raw archive in the body
 * - `DELETE /backup?name=<file>`   → delete a stored backup
 */
import {
  BackupError,
  createBackup,
  createBackupBuffer,
  deleteBackup,
  listBackups,
  readBackup,
  restoreBackup,
} from "@/admin/backup.server";

function errorResponse(error: unknown): Response {
  if (error instanceof BackupError) {
    return Response.json({ message: error.message }, { status: error.status });
  }
  console.error("[backup] erro inesperado:", error);
  return Response.json(
    { message: "Não foi possível concluir a operação de backup." },
    { status: 500 },
  );
}

function attachment(buffer: Buffer, name: string): Response {
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const name = params.get("name");

  try {
    if (name) {
      const { info, buffer } = readBackup(name);
      return attachment(buffer, info.name);
    }
    if (params.get("latest")) {
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      return attachment(createBackupBuffer(), `backup-${stamp}.mpbackup`);
    }
    return Response.json({ backups: listBackups() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(): Promise<Response> {
  try {
    return Response.json({ backup: createBackup() }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request): Promise<Response> {
  let buffer: Buffer;
  try {
    buffer = Buffer.from(await request.arrayBuffer());
  } catch {
    return Response.json({ message: "Upload inválido." }, { status: 400 });
  }
  if (buffer.length === 0) {
    return Response.json({ message: "Nenhum arquivo enviado." }, { status: 400 });
  }

  try {
    return Response.json({ manifest: restoreBackup(buffer) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request): Promise<Response> {
  const name = new URL(request.url).searchParams.get("name");
  if (!name) {
    return Response.json({ message: "Nome do backup ausente." }, { status: 400 });
  }
  try {
    deleteBackup(name);
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
