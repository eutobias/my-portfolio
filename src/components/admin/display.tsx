import type { ReactNode } from "react";

import { relationIsMany } from "@/admin/schema";
import type { FieldDef, FieldValue, RelationOption } from "@/admin/types";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

function labelFor(options: RelationOption[], id: number): string {
  return options.find((option) => option.id === id)?.label ?? `#${id}`;
}

/**
 * Turns a stored value into a presentational node for tables.
 */
export function renderFieldValue(
  field: FieldDef,
  value: FieldValue,
  options: RelationOption[] = [],
): ReactNode {
  if (field.type === "boolean") {
    return <Badge tone={value ? "green" : "gray"}>{value ? "Sim" : "Não"}</Badge>;
  }

  if (field.type === "select") {
    const option = field.options?.find((entry) => entry.value === value);
    return <Badge tone="blue">{option?.label ?? String(value ?? "—")}</Badge>;
  }

  if (field.type === "relation") {
    if (relationIsMany(field)) {
      const ids = Array.isArray(value) ? value : [];
      if (ids.length === 0) return <Text as="span" size="caption" className="text-gray-300">—</Text>;
      const visible = ids.slice(0, 2);
      const rest = ids.length - visible.length;
      return (
        <Box className="items-center gap-1">
          {visible.map((id) => (
            <Badge key={id} tone="amber">
              {labelFor(options, id)}
            </Badge>
          ))}
          {rest > 0 ? <Badge tone="gray">+{rest}</Badge> : null}
        </Box>
      );
    }

    if (value === null || value === undefined || value === "") {
      return <Text as="span" size="caption" className="text-gray-300">—</Text>;
    }
    return <Badge tone="amber">{labelFor(options, Number(value))}</Badge>;
  }

  if (value === null || value === undefined || value === "") {
    return (
      <Text as="span" size="caption" className="text-gray-300">
        —
      </Text>
    );
  }

  return (
    <Text as="span" size="caption" className="block truncate text-gray-700">
      {String(value)}
    </Text>
  );
}
