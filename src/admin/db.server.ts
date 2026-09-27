/**
 * SQLite persistence layer.
 *
 * Server-only: this module imports `node:sqlite` and must never be pulled into
 * a client bundle. The schema is derived from `src/schema.json`; tables are
 * created lazily on first use and new columns are added automatically.
 *
 * Relations:
 * - `one-to-one`   → stored as an INTEGER column holding the target id.
 * - `one-to-many`  → stored in a join table (the "one" side owns the list).
 * - `many-to-many` → stored in a join table on each side that declares it.
 */
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { collections, emptyValues, tableName } from "./schema";
import type {
  CollectionDef,
  FieldDef,
  FieldValue,
  Item,
  ListResult,
} from "./types";

const DB_PATH =
  process.env.ADMIN_DB_PATH ?? resolve(process.cwd(), ".data/admin.db");

type Cache = { db?: DatabaseSync };
const globalScope = globalThis as typeof globalThis & {
  [key: symbol]: Cache | undefined;
};
const CACHE_KEY = Symbol.for("mini-payload.db");
const cache: Cache = (globalScope[CACHE_KEY] ??= {});

function quote(name: string): string {
  return `"${name.replace(/"/g, '""')}"`;
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_]/g, "_");
}

function isManyRelation(field: FieldDef): boolean {
  return field.type === "relation" && field.relation?.type !== "one-to-one";
}

/** Fields that map to a real column on the collection's own table. */
function storedFields(collection: CollectionDef): FieldDef[] {
  return collection.fields.filter((field) => !isManyRelation(field));
}

/** Join table for a `to-many` relation field. */
function joinTable(collection: CollectionDef, field: FieldDef): string {
  return `r_${tableName(collection.slug)}_${safeName(field.name)}`;
}

function columnType(field: FieldDef): string {
  switch (field.type) {
    case "number":
      return "REAL";
    case "boolean":
      return "INTEGER";
    case "relation":
      return "INTEGER";
    default:
      return "TEXT";
  }
}

function migrate(db: DatabaseSync): void {
  for (const collection of collections) {
    const table = tableName(collection.slug);
    const fields = storedFields(collection);
    const columns = fields
      .map((field) => `${quote(field.name)} ${columnType(field)}`)
      .join(", ");

    db.exec(
      `CREATE TABLE IF NOT EXISTS ${table} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        ${columns ? `, ${columns}` : ""}
      )`,
    );

    const existing = new Set(
      (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map(
        (row) => row.name,
      ),
    );
    for (const field of fields) {
      if (!existing.has(field.name)) {
        db.exec(
          `ALTER TABLE ${table} ADD COLUMN ${quote(field.name)} ${columnType(field)}`,
        );
      }
    }

    for (const field of collection.fields) {
      if (!isManyRelation(field)) continue;
      const join = joinTable(collection, field);
      db.exec(
        `CREATE TABLE IF NOT EXISTS ${join} (
          source_id INTEGER NOT NULL,
          target_id INTEGER NOT NULL,
          position INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (source_id, target_id)
        )`,
      );
      db.exec(
        `CREATE INDEX IF NOT EXISTS ${join}_target_idx ON ${join} (target_id)`,
      );
    }
  }
}

function getDb(): DatabaseSync {
  if (cache.db) return cache.db;
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  migrate(db);
  cache.db = db;
  seedIfEmpty(db);
  return db;
}

function serialize(field: FieldDef, value: FieldValue): string | number | null {
  if (value === null || value === undefined) return null;
  switch (field.type) {
    case "boolean":
      return value ? 1 : 0;
    case "number":
      return Number(value);
    case "relation": {
      const id = Number(value);
      return !Array.isArray(value) && Number.isInteger(id) && id > 0 ? id : null;
    }
    default:
      return String(value);
  }
}

function rowToItem(
  collection: CollectionDef,
  row: Record<string, unknown>,
): Item {
  const item: Record<string, FieldValue | number> = {
    id: Number(row.id),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
  for (const field of collection.fields) {
    const raw = row[field.name];
    switch (field.type) {
      case "boolean":
        item[field.name] = raw === 1 || raw === 1n || raw === true;
        break;
      case "number":
        item[field.name] =
          raw === null || raw === undefined ? null : Number(raw);
        break;
      case "relation":
        item[field.name] = isManyRelation(field)
          ? []
          : raw === null || raw === undefined
            ? null
            : Number(raw);
        break;
      default:
        item[field.name] =
          raw === null || raw === undefined ? "" : String(raw);
    }
  }
  return item as Item;
}

/** Batch-load `to-many` relation ids for the given items. */
function hydrateManyRelations(
  db: DatabaseSync,
  collection: CollectionDef,
  items: Item[],
): void {
  if (items.length === 0) return;
  const byId = new Map(items.map((item) => [item.id, item]));
  const ids = items.map((item) => item.id);
  const placeholders = ids.map(() => "?").join(", ");

  for (const field of collection.fields) {
    if (!isManyRelation(field)) continue;
    const rows = db
      .prepare(
        `SELECT source_id, target_id FROM ${joinTable(
          collection,
          field,
        )} WHERE source_id IN (${placeholders}) ORDER BY position`,
      )
      .all(...ids) as { source_id: number; target_id: number }[];

    for (const row of rows) {
      const item = byId.get(Number(row.source_id));
      const current = (item?.[field.name] ?? []) as number[];
      current.push(Number(row.target_id));
      if (item) item[field.name] = current;
    }
  }
}

export function listItems(
  collection: CollectionDef,
  {
    page = 1,
    limit = 10,
    q = "",
  }: { page?: number; limit?: number; q?: string } = {},
): ListResult {
  const db = getDb();
  const table = tableName(collection.slug);
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
  const params: (string | number)[] = [];

  let where = "";
  const search = q.trim();
  if (search) {
    const searchable = collection.fields.filter((field) =>
      ["text", "email", "textarea", "select", "date"].includes(field.type),
    );
    if (searchable.length > 0) {
      where =
        " WHERE " +
        searchable.map((field) => `${quote(field.name)} LIKE ?`).join(" OR ");
      for (let i = 0; i < searchable.length; i += 1) {
        params.push(`%${search}%`);
      }
    }
  }

  const countRow = db
    .prepare(`SELECT COUNT(*) AS count FROM ${table}${where}`)
    .get(...params) as { count: number } | undefined;
  const total = Number(countRow?.count ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, Math.floor(page)), totalPages);
  const offset = (safePage - 1) * safeLimit;

  const rows = db
    .prepare(
      `SELECT * FROM ${table}${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    )
    .all(...params, safeLimit, offset) as Record<string, unknown>[];

  const items = rows.map((row) => rowToItem(collection, row));
  hydrateManyRelations(db, collection, items);

  return {
    items,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages,
  };
}

export function getItem(collection: CollectionDef, id: number): Item | null {
  const db = getDb();
  const row = db
    .prepare(`SELECT * FROM ${tableName(collection.slug)} WHERE id = ?`)
    .get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  const item = rowToItem(collection, row);
  hydrateManyRelations(db, collection, [item]);
  return item;
}

function saveManyRelations(
  db: DatabaseSync,
  collection: CollectionDef,
  id: number,
  values: Record<string, FieldValue>,
): void {
  for (const field of collection.fields) {
    if (!isManyRelation(field)) continue;
    if (!Object.prototype.hasOwnProperty.call(values, field.name)) continue;

    const join = joinTable(collection, field);
    db.prepare(`DELETE FROM ${join} WHERE source_id = ?`).run(id);

    const raw = values[field.name];
    const ids = Array.isArray(raw) ? raw : [];
    const insert = db.prepare(
      `INSERT INTO ${join} (source_id, target_id, position) VALUES (?, ?, ?)`,
    );
    ids.forEach((targetId, position) => {
      insert.run(id, Number(targetId), position);
    });
  }
}

/** Throw-free check that every referenced id actually exists. */
export function checkRelationTargets(
  collection: CollectionDef,
  values: Record<string, FieldValue>,
): Record<string, string> {
  const db = getDb();
  const errors: Record<string, string> = {};

  for (const field of collection.fields) {
    if (field.type !== "relation" || !field.relation) continue;
    if (!Object.prototype.hasOwnProperty.call(values, field.name)) continue;

    const target = collections.find(
      (entry) => entry.slug === field.relation?.to,
    );
    if (!target) {
      errors[field.name] = "Coleção de destino inexistente.";
      continue;
    }

    const statement = db.prepare(
      `SELECT 1 AS ok FROM ${tableName(target.slug)} WHERE id = ?`,
    );
    const exists = (id: number) => Boolean(statement.get(id));
    const raw = values[field.name];
    const ids = Array.isArray(raw) ? raw.map(Number) : [Number(raw)];

    if (
      raw !== null &&
      raw !== undefined &&
      ids.some((id) => !Number.isInteger(id) || !exists(id))
    ) {
      errors[field.name] = "Item relacionado inexistente.";
    }
  }

  return errors;
}

export function createItem(
  collection: CollectionDef,
  values: Record<string, FieldValue>,
): Item {
  const db = getDb();
  const table = tableName(collection.slug);
  const fields = storedFields(collection);
  const names = fields.map((field) => quote(field.name)).join(", ");
  const placeholders = fields.map(() => "?").join(", ");
  const params = fields.map((field) =>
    serialize(field, values[field.name] ?? null),
  );

  const result = db
    .prepare(
      `INSERT INTO ${table} (created_at, updated_at${
        names ? `, ${names}` : ""
      }) VALUES (datetime('now'), datetime('now')${
        placeholders ? `, ${placeholders}` : ""
      })`,
    )
    .run(...params);

  const id = Number(result.lastInsertRowid);
  saveManyRelations(db, collection, id, values);

  const item = getItem(collection, id);
  if (!item) throw new Error("Falha ao ler o item recém-criado.");
  return item;
}

export function updateItem(
  collection: CollectionDef,
  id: number,
  values: Record<string, FieldValue>,
): Item | null {
  const db = getDb();
  const byName = new Map(storedFields(collection).map((field) => [field.name, field]));
  const keys = Object.keys(values).filter((key) => byName.has(key));

  if (keys.length > 0) {
    const assignments = keys.map((key) => `${quote(key)} = ?`).join(", ");
    const params = keys.map((key) =>
      serialize(byName.get(key) as FieldDef, values[key] ?? null),
    );
    db.prepare(
      `UPDATE ${tableName(collection.slug)} SET ${assignments}, updated_at = datetime('now') WHERE id = ?`,
    ).run(...params, id);
  }

  saveManyRelations(db, collection, id, values);
  return getItem(collection, id);
}

/** Remove any reference to `targetId` of `target` from every collection. */
function cascadeDeleteReferences(
  db: DatabaseSync,
  target: CollectionDef,
  targetId: number,
): void {
  for (const collection of collections) {
    for (const field of collection.fields) {
      if (field.type !== "relation") continue;
      if (field.relation?.to !== target.slug) continue;

      if (isManyRelation(field)) {
        db.prepare(
          `DELETE FROM ${joinTable(collection, field)} WHERE target_id = ?`,
        ).run(targetId);
      } else {
        db.prepare(
          `UPDATE ${tableName(collection.slug)} SET ${quote(
            field.name,
          )} = NULL WHERE ${quote(field.name)} = ?`,
        ).run(targetId);
      }
    }
  }
}

export function deleteItem(collection: CollectionDef, id: number): boolean {
  const db = getDb();
  const result = db
    .prepare(`DELETE FROM ${tableName(collection.slug)} WHERE id = ?`)
    .run(id);

  for (const field of collection.fields) {
    if (!isManyRelation(field)) continue;
    db.prepare(`DELETE FROM ${joinTable(collection, field)} WHERE source_id = ?`).run(
      id,
    );
  }

  cascadeDeleteReferences(db, collection, id);

  return Number(result.changes) > 0;
}

/**
 * Seeds a small demo dataset the first time an empty database is opened.
 * Disable with `ADMIN_SEED=false`.
 */
function seedIfEmpty(db: DatabaseSync): void {
  if (process.env.ADMIN_SEED === "false") return;

  const posts = collections.find((entry) => entry.slug === "posts");
  const authors = collections.find((entry) => entry.slug === "authors");
  const profiles = collections.find((entry) => entry.slug === "profiles");
  const categories = collections.find((entry) => entry.slug === "categories");
  if (!posts || !authors || !profiles || !categories) return;

  const count = db
    .prepare(`SELECT COUNT(*) AS count FROM ${tableName(posts.slug)}`)
    .get() as { count: number };
  if (Number(count.count) > 0) return;

  const withDefaults = (
    collection: CollectionDef,
    overrides: Record<string, FieldValue>,
  ): Record<string, FieldValue> => ({
    ...emptyValues(collection),
    ...overrides,
  });

  const ana = createItem(
    authors,
    withDefaults(authors, {
      name: "Ana Beatriz",
      email: "ana@exemplo.com",
      bio: "Editora de tecnologia e entusiasta de DX.",
    }),
  );
  const carlos = createItem(
    authors,
    withDefaults(authors, {
      name: "Carlos Mendes",
      email: "carlos@exemplo.com",
      bio: "Designer e ilustrador focado em editorial.",
    }),
  );

  const anaProfile = createItem(
    profiles,
    withDefaults(profiles, {
      website: "https://ana.exemplo.com",
      location: "São Paulo",
    }),
  );
  const carlosProfile = createItem(
    profiles,
    withDefaults(profiles, {
      website: "https://carlos.exemplo.com",
      location: "Recife",
    }),
  );

  const tecnologia = createItem(
    categories,
    withDefaults(categories, {
      name: "Tecnologia",
      description: "Engenharia, ferramentas e arquitetura.",
    }),
  );
  const design = createItem(
    categories,
    withDefaults(categories, {
      name: "Design",
      description: "Tipografia, cor e experiência.",
    }),
  );
  const carreira = createItem(
    categories,
    withDefaults(categories, {
      name: "Carreira",
      description: "Crescimento profissional em produto.",
    }),
  );

  const welcome = createItem(
    posts,
    withDefaults(posts, {
      title: "Bem-vindo ao mini CMS",
      slug: "bem-vindo-ao-mini-cms",
      excerpt:
        "Um passeio rápido pelo painel gerado a partir de um descritor JSON, com campos, relações e SQLite.",
      status: "published",
      views: 42,
      featured: true,
      publishedAt: "2026-01-12",
      author: ana.id,
      categories: [tecnologia.id],
    }),
  );

  const typography = createItem(
    posts,
    withDefaults(posts, {
      title: "Guia de tipografia editorial",
      slug: "guia-de-tipografia-editorial",
      excerpt:
        "Como escolher escala, entrelinha e contraste para interfaces que parecem projetadas, não geradas.",
      status: "published",
      views: 18,
      featured: false,
      publishedAt: "2026-02-03",
      author: carlos.id,
      categories: [design.id],
    }),
  );

  const transition = createItem(
    posts,
    withDefaults(posts, {
      title: "Transição de carreira em tech",
      slug: "transicao-de-carreira-em-tech",
      excerpt:
        "Notas práticas sobre migrar para produto sem perder o repertório técnico.",
      status: "published",
      views: 7,
      featured: false,
      publishedAt: "2026-02-21",
      author: ana.id,
      categories: [carreira.id, tecnologia.id],
    }),
  );

  createItem(
    posts,
    withDefaults(posts, {
      title: "Rascunho: roadmap 2026",
      slug: "rascunho-roadmap-2026",
      excerpt: "Ideias ainda em revisão para os próximos ciclos.",
      status: "draft",
      views: 0,
      author: carlos.id,
      categories: [tecnologia.id],
    }),
  );

  updateItem(authors, ana.id, {
    profile: anaProfile.id,
    posts: [welcome.id, transition.id],
  });
  updateItem(authors, carlos.id, {
    profile: carlosProfile.id,
    posts: [typography.id],
  });
  updateItem(profiles, anaProfile.id, { author: ana.id });
  updateItem(profiles, carlosProfile.id, { author: carlos.id });

  updateItem(categories, tecnologia.id, {
    posts: [welcome.id, transition.id],
  });
  updateItem(categories, design.id, { posts: [typography.id] });
}
