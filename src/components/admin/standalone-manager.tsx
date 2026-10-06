"use client";

import { useState } from "react";

import type {
  CollectionDef,
  FieldValue,
  Item,
  RelationOptionsMap,
} from "@/admin/types";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

import { ItemForm } from "./item-form";
import { useToast } from "./toast";

export type StandaloneManagerProps = {
  collection: CollectionDef;
  initial: Item;
  relationOptions: RelationOptionsMap;
};

/**
 * Editor for a standalone collection: no table, no create/delete — just the
 * single record rendered as a form.
 */
export const StandaloneManager = ({
  collection,
  initial,
  relationOptions,
}: StandaloneManagerProps) => {
  const toast = useToast();
  const [item, setItem] = useState<Item>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async (values: Record<string, FieldValue>) => {
    setSubmitting(true);
    setErrors({});
    setFormError(null);
    try {
      const response = await fetch(`/payload/${collection.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await response.json()) as {
        item?: Item;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok) {
        setErrors(json.errors ?? {});
        setFormError(json.message ?? "Não foi possível salvar.");
        return;
      }
      if (json.item) setItem(json.item);
      toast.success("Registro atualizado com sucesso.");
    } catch {
      setFormError("Erro de rede ao salvar o registro.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <Box className="flex-col gap-1">
        <Box className="items-center gap-3">
          <Text size="title" className="font-semibold text-gray-900">
            {collection.label}
          </Text>
          <Badge tone="purple">Registro único</Badge>
        </Box>
        {collection.description ? (
          <Text size="caption" className="text-gray-500">
            {collection.description}
          </Text>
        ) : null}
      </Box>

      <Box className="max-w-2xl flex-col rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
        <ItemForm
          key={collection.slug}
          collection={collection}
          item={item}
          submitting={submitting}
          errors={errors}
          formError={formError}
          relationOptions={relationOptions}
          onSubmit={submit}
          hideCancel
        />
      </Box>
    </Box>
  );
};
