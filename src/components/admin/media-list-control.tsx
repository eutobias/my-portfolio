"use client";

import { useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiStar,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

import { acceptAttribute, isImageUrl } from "@/admin/media";
import type { FieldDef, MediaItem } from "@/admin/types";
import { Box } from "@/components/box";
import { Button, IconButton } from "@/components/button";
import { FieldWrapper } from "@/components/field-wrapper";
import { Text } from "@/components/text";

export type MediaListControlProps = {
  field: FieldDef;
  collectionSlug: string;
  value: MediaItem[];
  error?: string | undefined;
  disabled?: boolean | undefined;
  onChange: (value: MediaItem[]) => void;
};

async function uploadFile(
  file: File,
  collectionSlug: string,
  fieldName: string,
): Promise<string> {
  const params = new URLSearchParams({
    collection: collectionSlug,
    field: fieldName,
  });
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(`/media?${params.toString()}`, {
    method: "POST",
    body: form,
  });
  const json = (await response.json().catch(() => null)) as
    | { media?: { url?: string }; message?: string }
    | null;
  const url = json?.media?.url;
  if (!response.ok || !url) {
    throw new Error(json?.message ?? "Falha no upload.");
  }
  return url;
}

/**
 * Native `media-list` widget: upload several images, reorder them and pick one
 * as the principal (cover/highlight).
 */
export const MediaListControl = ({
  field,
  collectionSlug,
  value,
  error,
  disabled,
  onChange,
}: MediaListControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const ensurePrimary = (items: MediaItem[]): MediaItem[] => {
    if (items.length === 0 || items.some((item) => item.primary)) return items;
    const [first, ...rest] = items;
    return first ? [{ ...first, primary: true }, ...rest] : items;
  };

  const setPrimary = (index: number) =>
    onChange(value.map((item, i) => ({ ...item, primary: i === index })));

  const remove = (index: number) =>
    onChange(ensurePrimary(value.filter((_, i) => i !== index)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    const current = next[index];
    const swap = next[target];
    if (!current || !swap) return;
    next[index] = swap;
    next[target] = current;
    onChange(next);
  };

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setLocalError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadFile(file, collectionSlug, field.name));
      }
      const additions: MediaItem[] = urls.map((url, index) => ({
        url,
        alt: "",
        primary: value.length === 0 && index === 0,
      }));
      onChange(ensurePrimary([...value, ...additions]));
    } catch (uploadError) {
      setLocalError(
        uploadError instanceof Error ? uploadError.message : "Falha no upload.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const busy = disabled || uploading;

  return (
    <FieldWrapper
      label={field.label}
      required={field.required}
      help={field.help}
      error={error ?? localError ?? undefined}
    >
      <Box className="flex-col gap-3">
        {value.length === 0 ? (
          <Text size="caption" className="text-gray-400">
            Nenhuma mídia enviada.
          </Text>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {value.map((item, index) => (
              <Box
                key={`${item.url}-${index}`}
                className={`flex-col overflow-hidden rounded-md border bg-white ${
                  item.primary
                    ? "border-gray-900 ring-1 ring-gray-900"
                    : "border-gray-200"
                }`}
              >
                <Box className="relative">
                  {isImageUrl(item.url) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.alt ?? ""}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate p-3 text-xs text-gray-600 underline"
                    >
                      {item.url}
                    </a>
                  )}
                  {item.primary ? (
                    <span className="absolute left-2 top-2 rounded bg-gray-900 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                      Principal
                    </span>
                  ) : null}
                </Box>
                <Box className="flex-wrap items-center justify-between gap-0.5 border-t border-gray-100 p-1">
                  <IconButton
                    type="button"
                    label="Mover para trás"
                    disabled={busy || index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <FiArrowLeft aria-hidden />
                  </IconButton>
                  <IconButton
                    type="button"
                    label="Definir como principal"
                    disabled={busy || item.primary}
                    className={item.primary ? "text-amber-500" : ""}
                    onClick={() => setPrimary(index)}
                  >
                    <FiStar aria-hidden />
                  </IconButton>
                  <IconButton
                    type="button"
                    label="Mover para frente"
                    disabled={busy || index === value.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <FiArrowRight aria-hidden />
                  </IconButton>
                  <IconButton
                    type="button"
                    label="Remover"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    disabled={busy}
                    onClick={() => remove(index)}
                  >
                    <FiTrash2 aria-hidden />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </div>
        )}

        <Box className="items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            <FiUpload aria-hidden className="mr-1.5" />
            {uploading ? "Enviando…" : "Adicionar imagens"}
          </Button>
          <Text size="caption" className="text-gray-400">
            {value.length} mídia(s)
          </Text>
        </Box>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptAttribute(field)}
          disabled={busy}
          className="hidden"
          onChange={(event) => void onFiles(event.target.files)}
        />
      </Box>
    </FieldWrapper>
  );
};
