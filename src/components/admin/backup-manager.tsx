"use client";

import { useCallback, useRef, useState } from "react";

import type { BackupInfo, BackupManifest } from "@/admin/backup.server";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Button, IconButton } from "@/components/button";
import { Drawer } from "@/components/drawer";
import { Text } from "@/components/text";
import {
  FiDatabase,
  FiDownload,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

import { DataTable, type Column } from "./table";
import { useToast } from "./toast";

export type BackupManagerProps = {
  initial: BackupInfo[];
};

type DrawerState =
  | { kind: "closed" }
  | { kind: "restore"; file: File }
  | { kind: "delete"; backup: BackupInfo };

/** Deterministic (UTC) date format to avoid hydration mismatches. */
function formatDateTime(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(value);
  if (!match) return value || "—";
  return `${match[3]}/${match[2]}/${match[1]} ${match[4]}:${match[5]}`;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export const BackupManager = ({ initial }: BackupManagerProps) => {
  const toast = useToast();
  const [backups, setBackups] = useState<BackupInfo[]>(initial);
  const [drawer, setDrawer] = useState<DrawerState>({ kind: "closed" });
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backup");
      if (!response.ok) return;
      const json = (await response.json()) as { backups?: BackupInfo[] };
      if (json.backups) setBackups(json.backups);
    } finally {
      setLoading(false);
    }
  }, []);

  const closeDrawer = () => setDrawer({ kind: "closed" });

  const createBackup = async () => {
    setBusy(true);
    try {
      const response = await fetch("/backup", { method: "POST" });
      if (!response.ok) {
        toast.error("Não foi possível criar o backup.");
        return;
      }
      toast.success("Backup criado.");
      await reload();
    } catch {
      toast.error("Erro de rede ao criar o backup.");
    } finally {
      setBusy(false);
    }
  };

  const downloadCurrent = () => {
    window.location.assign("/backup?latest=1");
  };

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setDrawer({ kind: "restore", file });
  };

  const confirmRestore = async () => {
    if (drawer.kind !== "restore") return;
    setBusy(true);
    try {
      const response = await fetch("/backup", {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body: drawer.file,
      });
      const json = (await response.json().catch(() => null)) as
        | { message?: string; manifest?: BackupManifest }
        | null;
      if (!response.ok) {
        toast.error(json?.message ?? "Não foi possível restaurar o backup.");
        return;
      }
      closeDrawer();
      toast.success("Backup restaurado. Recarregando…");
      // The database (and possibly the session) changed underneath us.
      setTimeout(() => window.location.reload(), 1_200);
    } catch {
      toast.error("Erro de rede ao restaurar o backup.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (drawer.kind !== "delete") return;
    setBusy(true);
    try {
      const response = await fetch(
        `/backup?name=${encodeURIComponent(drawer.backup.name)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        toast.error("Não foi possível remover o backup.");
        return;
      }
      closeDrawer();
      toast.success("Backup removido.");
      await reload();
    } catch {
      toast.error("Erro de rede ao remover o backup.");
    } finally {
      setBusy(false);
    }
  };

  const columns: Column<BackupInfo>[] = [
    {
      key: "name",
      header: "Arquivo",
      render: (backup) => (
        <Box className="items-center gap-2">
          <FiDatabase aria-hidden className="h-4 w-4 shrink-0 text-gray-400" />
          <Text as="span" size="caption" className="truncate font-medium text-gray-900">
            {backup.name}
          </Text>
        </Box>
      ),
    },
    {
      key: "createdAt",
      header: "Criado em",
      width: "160px",
      render: (backup) => (
        <Text as="span" size="caption" className="whitespace-nowrap text-gray-500">
          {formatDateTime(backup.createdAt)}
        </Text>
      ),
    },
    {
      key: "size",
      header: "Tamanho",
      width: "110px",
      render: (backup) => (
        <Text as="span" size="caption" className="whitespace-nowrap text-gray-500">
          {formatSize(backup.size)}
        </Text>
      ),
    },
    {
      key: "__actions",
      header: "",
      width: "110px",
      align: "right",
      render: (backup) => (
        <Box className="items-center justify-end gap-1">
          <a
            href={`/backup?name=${encodeURIComponent(backup.name)}`}
            download={backup.name}
            title="Baixar"
            aria-label="Baixar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <FiDownload aria-hidden />
          </a>
          <IconButton
            type="button"
            label="Remover"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setDrawer({ kind: "delete", backup })}
          >
            <FiTrash2 aria-hidden />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <Box className="flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
        <Box className="flex-col gap-1">
          <Box className="items-center gap-3">
            <Text size="title" className="font-semibold text-gray-900">
              Backup
            </Text>
            <Badge tone="gray">{backups.length}</Badge>
          </Box>
          <Text size="caption" className="text-gray-500">
            Baixe ou restaure o banco de dados e as imagens do sistema.
          </Text>
        </Box>
        <Box className="flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" onClick={() => void reload()} disabled={loading}>
            <FiRefreshCw aria-hidden /> Atualizar
          </Button>
          <Button type="button" variant="secondary" onClick={downloadCurrent} disabled={busy}>
            <FiDownload aria-hidden /> Baixar atual
          </Button>
          <Button type="button" variant="secondary" onClick={pickFile} disabled={busy}>
            <FiUpload aria-hidden /> Restaurar
          </Button>
          <Button type="button" variant="primary" onClick={() => void createBackup()} disabled={busy}>
            <FiPlus aria-hidden /> Criar backup
          </Button>
        </Box>
      </Box>

      <Box className="rounded-lg border border-gray-200 bg-white p-4">
        <Text size="caption" className="text-gray-500">
          O backup reúne um snapshot consistente do banco SQLite e todos os
          arquivos de <span className="font-mono">public/images</span> e{" "}
          <span className="font-mono">public/files</span>. Restaurar substitui o
          banco atual e regrava as imagens.
        </Text>
      </Box>

      <input
        ref={fileRef}
        type="file"
        accept=".mpbackup,application/gzip"
        className="hidden"
        onChange={onFileChange}
      />

      <DataTable
        columns={columns}
        rows={backups}
        rowKey={(backup) => backup.name}
        loading={loading}
        empty="Nenhum backup armazenado ainda."
      />

      <Drawer
        open={drawer.kind !== "closed"}
        onClose={closeDrawer}
        title={
          drawer.kind === "restore"
            ? "Restaurar backup"
            : drawer.kind === "delete"
              ? "Remover backup"
              : ""
        }
        description={
          drawer.kind === "restore"
            ? "O banco atual será substituído."
            : drawer.kind === "delete"
              ? "Esta ação não pode ser desfeita."
              : undefined
        }
      >
        {drawer.kind === "restore" ? (
          <Box className="flex-col gap-6">
            <Text className="text-gray-700">
              Restaurar o arquivo{" "}
              <Text as="span" className="font-semibold text-gray-900">
                {drawer.file.name}
              </Text>
              ? O banco de dados atual será substituído e as imagens do backup
              regravadas. A sessão pode ser encerrada.
            </Text>
            <Box className="items-center justify-end gap-2 border-t border-gray-200 pt-4">
              <Button type="button" variant="secondary" onClick={closeDrawer} disabled={busy}>
                Cancelar
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => void confirmRestore()}
                disabled={busy}
              >
                {busy ? "Restaurando…" : "Restaurar"}
              </Button>
            </Box>
          </Box>
        ) : null}

        {drawer.kind === "delete" ? (
          <Box className="flex-col gap-6">
            <Text className="text-gray-700">
              Remover o backup{" "}
              <Text as="span" className="font-semibold text-gray-900">
                {drawer.backup.name}
              </Text>
              ?
            </Text>
            <Box className="items-center justify-end gap-2 border-t border-gray-200 pt-4">
              <Button type="button" variant="secondary" onClick={closeDrawer} disabled={busy}>
                Cancelar
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => void confirmDelete()}
                disabled={busy}
              >
                {busy ? "Removendo…" : "Remover"}
              </Button>
            </Box>
          </Box>
        ) : null}
      </Drawer>
    </Box>
  );
};
