"use client";

import { useState } from "react";

import { emptyValues } from "@/admin/schema";
import type {
  CollectionDef,
  FieldValue,
  Item,
  RelationOptionsMap,
} from "@/admin/types";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { FieldControl } from "./field-control";

export type ItemFormProps = {
  collection: CollectionDef;
  item: Item | null;
  submitting: boolean;
  errors: Record<string, string>;
  formError: string | null;
  relationOptions: RelationOptionsMap;
  onSubmit: (values: Record<string, FieldValue>) => void;
  onCancel: () => void;
};

function initialValues(
  collection: CollectionDef,
  item: Item | null,
): Record<string, FieldValue> {
  const base = emptyValues(collection);
  if (!item) return base;
  for (const field of collection.fields) {
    base[field.name] = item[field.name] ?? base[field.name] ?? null;
  }
  return base;
}

/**
 * Create/edit form rendered inside the drawer.
 */
export const ItemForm = ({
  collection,
  item,
  submitting,
  errors,
  formError,
  relationOptions,
  onSubmit,
  onCancel,
}: ItemFormProps) => {
  const [values, setValues] = useState<Record<string, FieldValue>>(() =>
    initialValues(collection, item),
  );

  const update = (name: string, value: FieldValue) => {
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  return (
    <Box
      as="form"
      className="flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      {formError ? (
        <Box className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
          <Text size="caption" className="text-red-700">
            {formError}
          </Text>
        </Box>
      ) : null}

      {collection.fields.map((field) => (
        <FieldControl
          key={field.name}
          field={field}
          value={values[field.name] ?? null}
          error={errors[field.name]}
          disabled={submitting}
          relationOptions={relationOptions[field.name] ?? []}
          onChange={(value) => update(field.name, value)}
        />
      ))}

      <Box className="items-center justify-end gap-2 border-t border-gray-200 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Salvando…" : item ? "Salvar alterações" : "Criar item"}
        </Button>
      </Box>
    </Box>
  );
};
