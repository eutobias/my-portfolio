# eutobias.dev

Monorepo for eutobias.dev.

## Structure

```
.
├── apps/          # applications
├── package.json   # workspace root
└── pnpm-workspace.yaml
```

## Commands

```bash
pnpm install       # install all workspaces
pnpm dev           # run dev in every app (parallel)
pnpm build         # build every app
pnpm lint          # lint every app
pnpm test          # test every app
```

## Add an app

```bash
mkdir -p apps/my-app
cd apps/my-app
pnpm init
```

Then give it a unique `name` (e.g. `@eutobias.dev/my-app`) and run `pnpm install` from root.
