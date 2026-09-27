/**
 * Shared descriptor types for the mini-CMS.
 *
 * The whole admin panel is generated from a single JSON document
 * (`src/schema.json`). These types describe that document.
 */

export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "date"
  | "relation";

export type SelectOption = {
  label: string;
  value: string;
};

export type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-many";

export type RelationDef = {
  /** Slug of the target collection. */
  to: string;
  type: RelationType;
};

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Only for `select` fields. */
  options?: SelectOption[];
  /** Only for `number` fields. */
  min?: number;
  max?: number;
  /** Only for `relation` fields. */
  relation?: RelationDef;
  defaultValue?: string | number | boolean;
};

export type CollectionDef = {
  slug: string;
  label: string;
  icon?: string;
  description?: string;
  /**
   * Ordered list of columns shown in the list view. Accepts field names plus
   * the special `id`, `createdAt` and `updatedAt`. When omitted, all fields
   * plus the managed timestamps are shown.
   */
  list?: string[];
  fields: FieldDef[];
};

export type SchemaDef = {
  title?: string;
  collections: CollectionDef[];
};

/** Primitive value a field can hold. Relation values are numeric ids. */
export type FieldValue = string | number | boolean | null | number[];

/** An option shown by a relation control and used to render labels. */
export type RelationOption = {
  id: number;
  label: string;
};

/** Map of field name to its resolved relation options. */
export type RelationOptionsMap = Record<string, RelationOption[]>;

/** A persisted row plus the two managed timestamps. */
export type Item = {
  id: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: FieldValue | number;
};

export type ListResult = {
  items: Item[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/** Shape returned by the mutation endpoints. */
export type MutationResult = {
  item: Item;
};
