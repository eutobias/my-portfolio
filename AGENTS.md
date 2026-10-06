# AGENTS.md

## Project

**Mini Payload** — a schema-driven mini CMS plus a public portfolio, built on
[Waku](https://waku.gg) (minimal React framework, React 19 RSC + file-system
routing). The admin panel, REST API, form validation and SQLite schema are all
generated from the collection descriptors in `src/schemas/`. The public site
reads the same collections through `src/portfolio/portfolio.server.ts`.

User-facing copy and validation messages are **pt-BR**. Code comments mix EN/PT-BR.

## Stack

- Waku `1.0.0-rc.1`, React `~19.3`, `react-server-dom-webpack`
- Tailwind CSS v4 via `@tailwindcss/vite` (imported in `src/styles.css` with `@import 'tailwindcss'`)
- React Compiler via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`
- Persistence: `node:sqlite` (`DatabaseSync`), no ORM
- `react-icons` (Feather `Fi*`) for icons
- TypeScript strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`
- Package manager: **pnpm** (`pnpm-lock.yaml`). Node `^22.15` / `^24` / `^26`.

## Commands

```sh
pnpm dev        # waku dev
pnpm build      # waku build
pnpm start      # waku start (serve build)
pnpm typegen    # waku router typegen — rerun after adding/removing pages
```

No test runner and no linter are configured. Verify with `pnpm typegen` + `pnpm build` (or `tsc --noEmit`).

## Layout

```
src/
  schemas/               # SOURCE OF TRUTH: collections + fields
    index.ts             # exports `schemaTitle` + `collections`
    navigation.ts        # standalone (site header/footer config)
    nav-links.ts         # nav items (main + footer)
    projects.ts experiences.ts skills.ts messages.ts site-settings.ts
  data/portfolio.seed.ts # first-run seed content (adapted from legacy __data)
  portfolio/
    portfolio.server.ts  # public read model (projects, experience, skills, nav)
  pages/                 # Waku file-system routes
    _layout.tsx          # root layout (static): fonts, CSS vars, theme wrapper
    (site)/              # public site (route group, no URL segment)
      _layout.tsx        # neo-brutalist header/footer/theme+language switcher, dynamic
      [locale]/          # every public page is locale-prefixed (/pt, /en)
        index.tsx projects/{index,[slug]}.tsx about.tsx contact.tsx
        experience.tsx skills.tsx  # legacy redirects to /[locale]/about
    login.tsx
    admin/_layout.tsx  admin/index.tsx  admin/[collection]/index.tsx  admin/users.tsx
    _api/auth/{login,logout,refresh,me}.ts
    _api/auth/users.ts  _api/auth/users/[id].ts
    _api/media.ts  _api/files/[...path].ts  _api/messages.ts
    _api/payload/[collection].ts
    _api/payload/[collection]/[id].ts
    _api/backup.ts
  auth/                  # opaque cookie sessions (see Auth below)
  admin/
    types.ts             # descriptor + value types
    schema.ts            # reads @/schemas, table names, defaults, labels
    validation.ts        # coerceInput(): validate/coerce raw JSON
    media.ts             # isomorphic media policy (accept allowlist, URL checks)
    media.server.ts      # uploads on disk under public/files
    db.server.ts         # node:sqlite layer, migration, CRUD, seed
  components/
    box.tsx text.tsx badge.tsx button.tsx card.tsx container.tsx drawer.tsx field-wrapper.tsx
    site/                # public composed components (Box + Text + design tokens)
      ui.tsx             # Shell, SocialIcon
      brutal-button.tsx  panel.tsx  chip.tsx  title-with-icon.tsx
      theme-switcher.tsx contact-form.tsx
    admin/*              # client components ("use client")
  middleware/
    no-trailing-slash.ts
    auth.ts              # auth gate + transparent refresh (Hono)
  pages.gen.ts           # GENERATED — do not edit
  styles.css             # Tailwind + brutalist CSS variables
```

`@/*` aliases to `src/*` (set in `waku.config.ts` and `tsconfig.json`).

## Architecture rules

- **`src/schemas/` is the single source of truth.** Each collection lives in its own `<name>.ts` file exporting a typed `CollectionDef`; `src/schemas/index.ts` aggregates them into the `collections` array and `schemaTitle`. To add a collection, create the file and register it. `db.server.ts` migrates the SQLite schema lazily on first open (adds missing tables/columns; never drops). Do not hand-write per-collection tables/forms. Restart the dev server after adding a collection.
- **Field types** (`src/admin/types.ts`): `text | email | textarea | number | boolean | select | date | relation | media | media-list | list`. Relations: `one-to-one` (INTEGER column), `one-to-many` / `many-to-many` (join tables `r_<collection>_<field>`).
- **Standalone collections** (`standalone: true`) hold exactly one record. Use `getStandalone` / `saveStandalone` in `db.server.ts` (they lazily create the row from field defaults). The admin renders `StandaloneManager` (inline form, no table/CRUD); the API exposes `GET`/`PATCH /payload/:collection` and rejects `POST`/`DELETE` with `405`. Example: `navigation`, `site-settings`.
- **Server-only modules are `*.server.ts`** (and `src/admin/db.server.ts`). They import `node:sqlite` and must never reach a client bundle. Data fetching for pages happens in server components.
- **Interactive admin UI is client components** (`"use client"` at top of every file in `src/components/admin/`). They fetch the REST API; they never import `db.server.ts`.
- **`_api/` routes are served with the prefix stripped.** `src/pages/_api/payload/[collection].ts` → `/payload/:collection`. Client fetch paths must match.
- **API contract:** `GET/POST /payload/:collection`, `GET/PATCH/PUT/DELETE /payload/:collection/:id`. Standalone collections use `GET/PATCH /payload/:collection`. Errors return `{ message, errors? }`; validation `422`, missing `404`, unsupported method `405`.
- **Validation lives in `coerceInput`** (`src/admin/validation.ts`). Create (`partial:false`) applies defaults to every absent field; update (`partial:true`) only touches keys present. Relation targets are checked via `checkRelationTargets`.
- **Hydration safety:** format dates deterministically (regex on the stored string), not with `toLocaleString`/`Date`.
- **Deletes cascade:** `deleteItem` removes join rows and nulls/clears references from other collections.
- **Seed:** `db.server.ts` populates projects, experiences, skills and navigation from `src/data/portfolio.seed.ts` on first run (empty `projects` table). Disable with `ADMIN_SEED=false`. Seed content is localized: `{ pt, en }` objects (`Localized`) and `{ pt: string[], en: string[] }` (`LocalizedList`).

## i18n (multi-language)

- **Locales** live in `src/schemas/locales.ts` (`locales`, `defaultLocale = "pt"`,
  `localeLabel`). Each collection declares `locales: string[]` (tab/column order);
  omit to fall back to `[defaultLocale]`. Different collections may use different
  sets (e.g. `messages` only `["pt"]`).
- **Storage is one column per locale** (`name_pt`, `name_en`, ...). `storedColumns`
  in `db.server.ts` expands `FieldDef` into physical columns. `migrate()` renames a
  legacy single column `<field>` to `<field>_<default>` on startup (idempotent), so
  old values become the default locale.
- **Which fields localize:** by default `text`, `textarea`, `email`, `list`; override
  per field with `localized: true/false`. Structural fields (`url`, `repo`, `year`,
  `period`, `icon`, `href`, `section`, `email`) set `localized: false`. Non-editorial
  types (`number`, `boolean`, `date`, `select`, `relation`, `media`, `media-list`)
  never localize.
- **API/form shape is nested:** `{ "name": { "pt": "...", "en": "..." } }`. The DB
  layer converts to/from suffixed columns; partial updates only touch the locales
  present in the payload.
- **Required is enforced in every locale** (no fallback). Validation errors are keyed
  `<field>_<locale>` (e.g. `name_en`).
- **Admin:** `ItemForm` shows one tab per locale (localized fields) followed by a
  fixed **Geral** section for shared fields. List columns render the default locale
  (`valueForLocale`).
- **Public routes are fully prefixed** under `(site)/[locale]/` (`/pt/...`, `/en/...`).
  `src/middleware/locale.ts` redirects `/` and legacy non-prefixed paths to
  `/{defaultLocale}`. `src/portfolio/portfolio.server.ts` take a `locale` argument;
  helpers in `src/portfolio/locale.ts` handle detection/prefixing.

## Portfolio (public site)

- Design source of truth is **`docs/design.md`** (4 themes, type scale, spacing,
  offset shadows, 4px borders, radius 0). Reference layouts live in `docs/layout/*.png`
  (home, projetos, detalhes-projeto, sobre, contato).
- Pages live under the `(site)` route group, all locale-prefixed:
  `/[locale]`, `/[locale]/projects`, `/[locale]/projects/[slug]`,
  `/[locale]/about`, `/[locale]/contact`. `(site)/_layout.tsx` is **dynamic** and
  renders the header/footer/theme+language switcher from the standalone
  `navigation` + `nav-links` (links prefixed via `localeHref`).
- `src/portfolio/portfolio.server.ts` is the only read model for the public site:
  `getNavigation(locale)`, `getProjects(locale)`, `getProjectBySlug(locale, slug)`,
  `getExperiences(locale)`, `getSkills(locale)`. It resolves localized values for
  the locale (no fallback) and splits list fields into arrays.
- **Tokens:** `src/styles.css` defines the four themes as CSS variables on
  `[data-theme="mint|pastel|bold|sunset"]` (`--bg`, `--bg-2`, `--ink`, `--muted`,
  `--border`, `--primary`, `--secondary`, `--accent`, `--highlight`, plus
  `--*-ink` text colors). Default is `mint`; `ThemeSwitcher` persists to
  localStorage under `tt-theme` and the root layout sets `data-theme` before paint.
  Fonts: **Space Grotesk** (sans) + **JetBrains Mono** (mono) via `@theme`.
- **Composition rule:** any new public component must be built from `Box` +
  `Text`; theme colors/shadow/borders are applied through `className` in the
  composed component (e.g. `TitleWithIcon` uses `Text` + an icon). Reusable
  primitives live in `src/components/site/` (`BrutalButton`, `Panel`, `Chip`,
  `TitleWithIcon`, `ThemeSwitcher`, `ContactForm`).
- **Admin is out of scope for this design** — the admin UI keeps its own neutral
  styling; only public pages follow the neo-brutalist system.
- Portfolio/project images are committed under `public/images`. Project `cover`
  is a media field; `gallery` is a newline-separated list of image URLs.
- The contact form (`ContactForm`) posts nested values (`{ name: { pt }, ... }`) to
  the public `POST /messages`, which stores into the `messages` collection
  (`locales: ["pt"]`, viewable in the admin).

## Auth

Opaque DB-backed sessions (no JWT), delivered as httpOnly cookies and refreshed
by middleware. See `src/auth/` and `src/middleware/auth.ts`.

- **Default login.** First run seeds **`admin@example.com` / `admin123`**
  (override `ADMIN_EMAIL` / `ADMIN_PASSWORD` before first boot). Visit `/admin`;
  it redirects to `/login` while unauthenticated. Manage users at `/admin/users`.
- **Tokens.** Random 256-bit strings; only their SHA-256 hash is stored in
  `auth_tokens`. Access TTL **30 min**, refresh TTL **24 h**.
- **Rotation.** Every login or refresh deletes **all** tokens for the user, then
  inserts a fresh pair (`createSession` / `rotateSession`). One active session per
  user: logging in on one tab invalidates the others.
- **Transport.** httpOnly + `SameSite=Lax` cookies `mp_access` / `mp_refresh`.
  `Secure` is on in production; force with `AUTH_COOKIE_SECURE` (`true`/`false`).
- **Middleware gate** (`src/middleware/auth.ts`) protects `/admin*`, `/payload*`,
  `/auth/users*`, `/media` and `/backup`: valid access → continue; expired access + valid
  refresh → rotate (API continues, page gets a `303` back to itself so RSC sees
  the new cookie); otherwise `401` JSON for API paths or `307` to `/login?next=…`.
  Unsafe cross-origin requests are rejected with `403`.
- **Reading the user.** Server components use `getCurrentUser()` from
  `src/auth/session.server.ts` (reads the request cookie via `unstable_getHeaders`),
  so the **admin layout must be `render: "dynamic"`**. API routes use
  `readAccessToken` / `getUserByAccessToken`.
- **Endpoints:** `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`,
  `GET /auth/me`, and user CRUD `GET|POST /auth/users`, `GET|PATCH|PUT|DELETE /auth/users/:id`.
  Login/logout accept JSON (returns JSON) or form-encoded (returns `303`).
- **Users** (`src/auth/users.server.ts`): unique lowercased emails, 8+ char
  passwords hashed with scrypt, hashes never returned. Changing a password
  revokes sessions. Cannot delete yourself or the last user (`409`).

## Media

- **Media fields** (`type: "media"`) store a single served URL (`/files/<name>`).
  Uploaded via `POST /media?collection=&field=` (multipart, protected) and
  validated against the field's `accept` (`"image/*"`, `image/png`, `"png"`,
  `".pdf"`) and `maxSize` (bytes). `FieldControl` renders `MediaControl`.
- **Media lists** (`type: "media-list"`) are a native field type: an ordered
  array of `{ url, alt?, primary? }` (JSON in a TEXT column, at most one
  `primary`). The admin renders `MediaListControl` (multi-upload, reorder,
  set principal, remove). Used by `projects.medias`; the public read model
  derives `cover` (primary) and `gallery` (the rest). Stored URLs must be
  `/files/...` (uploads) or `/images/...` (committed assets) — see
  `isMediaUrl` in `src/admin/media.ts`.
- **Lists** (`type: "list"`) are a native field type: an ordered array of
  strings (JSON in a TEXT column). The admin renders `ListControl` (add, edit,
  reorder, remove). Used by `projects.highlights/challenges/results` and
  `projects.frontend/backend`. Startup syncs convert legacy text:
  `syncProjectLists` (`project_lists_v1`, newline-separated) and
  `syncProjectTechLists` (`project_tech_lists_v1`, comma-separated); the public
  read model uses `asList`.
- Files land in `public/files` (gitignored) and are served by the dynamic
  `GET /files/[...path]` route, with `nosniff` + a `sandbox` CSP. Executable /
  HTML extensions are always blocked; omitting `accept` allows images + PDF only.
- A startup backfill (`backfillProjectMedias` in `db.server.ts`) migrates legacy
  `cover`/`gallery` columns into `medias` keeping the existing image names. A
  one-time guarded sync (`syncProjectMedias`, key `project_medias_v1` in
  `app_meta`) then rebuilds `medias` from the seed mapping (derived from
  `__data/projects.data.ts`) so every image in `public/images` is registered to
  its project; admin edits after that are preserved.

## Storage

- DB file: `.data/admin.db` (WAL mode). Override with `ADMIN_DB_PATH`.
- Created + migrated automatically; seeded on first open unless `ADMIN_SEED=false`.
- `.data/` and `public/files/` are gitignored.
- `public/images/` holds committed portfolio assets.

## Backup

- **`src/admin/backup.server.ts`** bundles a consistent SQLite snapshot (via
  `VACUUM INTO`) plus every file under `public/images` and `public/files` into a
  single gzip JSON archive (`<name>.mpbackup`, base64 assets).
- **API** (`src/pages/_api/backup.ts`, protected): `GET /backup` lists stored
  backups, `GET /backup?name=` downloads one, `GET /backup?latest=1` creates and
  downloads a fresh archive, `POST /backup` creates a stored backup, `PUT /backup`
  restores the raw archive body, `DELETE /backup?name=` removes one.
- **Restore** attaches the uploaded database and copies its tables into the live
  connection inside a transaction (never swaps the file), then rewrites assets.
  Restored auth tokens can invalidate the current session.
- **Admin UI** at `/admin/backup` (`BackupManager`); sidebar link under
  Administração.
- **Routine** (`src/middleware/backup.ts` → `startBackupScheduler`): on startup,
  if overdue, and every `ADMIN_BACKUP_INTERVAL_HOURS` (default 24), writes a
  backup to `.data/backups` and keeps the latest `ADMIN_BACKUP_KEEP` (default 10).
  Disable with `ADMIN_BACKUP=false`.

## Conventions

- Read/create/update/delete helpers live in `db.server.ts`; keep SQL there, not in pages.
- Reuse `Box` (polymorphic flex container) and `Text` (typography scale) for the admin UI. The public site uses Tailwind utilities + `src/components/site/ui.tsx`.
- Admin list columns come from `collection.list` in the collection descriptor; entries may be field names or `id`/`createdAt`/`updatedAt`. Omit `list` to show all fields.
- `collection.icon` is optional and must be a **Feather icon name** from the registry in `src/components/admin/collection-icon.tsx` (e.g. `"fileText"`, `"users"`, `"settings"`). Never use emoji/unicode glyphs.
- Public site text avoids em-dashes; use plain hyphens or restructure.

## Gotchas

- `src/pages.gen.ts` is generated by `pnpm typegen`. Never edit by hand; rerun after page changes or imports like `PageProps<"/projects/[slug]">` break.
- `.data/` and `dist/` are build/runtime artifacts; don't commit or edit.
- **Layouts are static by default.** Any layout that reads request data (cookies, headers, DB-backed navigation) must export `getConfig` with `render: "dynamic"`. The admin and `(site)` layouts already do; reading `unstable_getHeaders` in a static layout yields empty headers, not an error.
- `docs/llms.txt` is the full Waku reference — consult it for framework APIs (`ApiContext`, `PageProps`, `getConfig`, route groups, server actions) before guessing.
