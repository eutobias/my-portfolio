import schemaJson from "../schema.json";
import type {
  CollectionDef,
  FieldDef,
  FieldValue,
  SchemaDef,
} from "./types";

const schema = schemaJson as unknown as SchemaDef;

export const schemaTitle = schema.title ?? "Admin";
export const collections: CollectionDef[] = schema.collections ?? [];

export function getCollections(): CollectionDef[] {
  return collections;
}

export function getCollection(slug: string): CollectionDef | undefined {
  return collections.find((collection) => collection.slug === slug);
}

/** SQLite table name for a collection. */
export function tableName(slug: string): string {
  return `c_${slug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
}

/** Whether a relation field stores a list of target ids. */
export function relationIsMany(field: FieldDef): boolean {
  return (
    field.type === "relation" &&
    field.relation?.type !== "one-to-one"
  );
}

/** Whether a relation field stores a single target id. */
export function relationIsOne(field: FieldDef): boolean {
  return field.type === "relation" && field.relation?.type === "one-to-one";
}

/** Default value for a single field. */
export function fieldDefault(field: FieldDef): FieldValue {
  if (field.defaultValue !== undefined) return field.defaultValue;
  switch (field.type) {
    case "boolean":
      return false;
    case "number":
      return field.min ?? 0;
    case "relation":
      return relationIsMany(field) ? [] : null;
    case "select":
      return field.options?.[0]?.value ?? "";
    default:
      return "";
  }
}

/** Empty record of values for a collection (used by the create form). */
export function emptyValues(collection: CollectionDef): Record<string, FieldValue> {
  const values: Record<string, FieldValue> = {};
  for (const field of collection.fields) {
    values[field.name] = fieldDefault(field);
  }
  return values;
}

/** Human label used when showing a single item (e.g. delete confirmation). */
export function itemLabel(collection: CollectionDef, item: Record<string, unknown>): string {
  const preferred = collection.fields.find((field) => field.type === "text");
  const candidates = preferred ? [preferred, ...collection.fields] : collection.fields;

  for (const field of candidates) {
    const value = item[field.name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return `#${String(item.id ?? "")}`;
}
