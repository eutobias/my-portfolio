# Tema Tailwind — Tokens

Fonte: `01 · Tokens.pdf` (COR · Tipografia · Espaço)

## Tokens extraídos

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#111111` | Bordas e texto |
| `ink-soft` | `#5C5C5C` | Corpo |
| `ink-muted` | `#9A9691` | Metadados |
| `paper` | `#FFFFFF` | Fundo do site |
| `surface` | `#F6F4EF` | Fundo de card |
| `mint` | `#3BDD9B` | CTA primário |
| `mint-soft` | `#CBF6E5` | Fundo suave |
| `lavender` | `#CBB7F9` | Secundário / nav |
| `lavender-soft` | `#EAE2FD` | Fundo suave |
| `orange` | `#FF8A4F` | Ativo / ação |
| `yellow` | `#FFD74B` | Período / aviso |
| `outer` | `#DCD6EA` | Moldura do site |

Tipografia:

- Display — Space Grotesk 700 · 52/55
- H1 — Space Grotesk 700 · 40/44
- H2 — Space Grotesk 700 · 26/32
- H3 — Space Grotesk 600 · 18/24
- Body — Inter 400 · 15/24
- Small — Inter 400 · 13/21
- Label — Inter 700 · 11 · caps
- Mono — JetBrains Mono 500 · 12

Projeto usa **Tailwind v4**.

## `src/assets/tokens.css`

```css
/* src/assets/tokens.css */
@import "tailwindcss";

/* --------------------------------------------------
   Cores
   Gera: bg-ink, text-ink, border-ink, ring-mint, etc.
   -------------------------------------------------- */
@theme {
  --color-ink: #111111;
  --color-ink-soft: #5c5c5c;
  --color-ink-muted: #9a9691;

  --color-paper: #ffffff;
  --color-surface: #f6f4ef;
  --color-outer: #dcd6ea;

  --color-mint: #3bdd9b;
  --color-mint-soft: #cbf6e5;

  --color-lavender: #cbb7f9;
  --color-lavender-soft: #eae2fd;

  --color-orange: #ff8a4f;
  --color-yellow: #ffd74b;

  /* --------------------------------------------------
     Escala tipográfica
     Gera: text-display, text-h1, text-h2, text-h3,
           text-body, text-small, text-label, text-mono
     -------------------------------------------------- */
  --text-display: 52px;
  --text-display--line-height: 55px;
  --text-display--font-weight: 700;
  --text-display--letter-spacing: -0.02em;

  --text-h1: 40px;
  --text-h1--line-height: 44px;
  --text-h1--font-weight: 700;
  --text-h1--letter-spacing: -0.02em;

  --text-h2: 26px;
  --text-h2--line-height: 32px;
  --text-h2--font-weight: 700;
  --text-h2--letter-spacing: -0.01em;

  --text-h3: 18px;
  --text-h3--line-height: 24px;
  --text-h3--font-weight: 600;

  --text-body: 15px;
  --text-body--line-height: 24px;
  --text-body--font-weight: 400;

  --text-small: 13px;
  --text-small--line-height: 21px;
  --text-small--font-weight: 400;

  --text-label: 11px;
  --text-label--line-height: 16px;
  --text-label--font-weight: 700;
  --text-label--letter-spacing: 0.08em;

  --text-mono: 12px;
  --text-mono--line-height: 18px;
  --text-mono--font-weight: 500;
}

/* --------------------------------------------------
   Fontes via next/font
   Usa `inline` para o utilitário consumir o valor real
   da variável gerada pelo next/font.
   -------------------------------------------------- */
@theme inline {
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}

/* --------------------------------------------------
   Base
   -------------------------------------------------- */
@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-paper font-body text-body text-ink;
  }

  ::selection {
    @apply bg-mint text-ink;
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-mint;
  }
}

/* Opcional: atalho para o micro-label caps */
@utility label-caps {
  @apply text-label uppercase;
}
```

## Fontes — `src/app/(frontend)/layout.tsx`

```tsx
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

## Import — `src/assets/styles.css`

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./themes.css";
```

## Exemplos de uso

```tsx
<h1 className="font-display text-display text-ink">Hello, my name is</h1>
<h2 className="font-display text-h1">Featured Projects</h2>
<h3 className="font-display text-h2">What I do best</h3>
<h4 className="font-display text-h3">Front-End Engineering</h4>

<p className="text-body text-ink-soft">Senior Full-Stack Developer...</p>
<p className="text-small text-ink-soft">At the exhibition held by...</p>
<span className="label-caps text-ink-muted">EMAIL · PHONE · WHATSAPP</span>

<code className="font-mono text-mono text-ink-soft">
  const stack = ['React','Node.js','Go']
</code>

<button className="bg-mint text-ink">Contato</button>
<nav className="bg-lavender-soft text-ink">...</nav>
<div className="border border-outer bg-surface">Card</div>
```

## Bridge opcional com sistema `--theme-*` em `themes.css`

```css
:root {
  --theme-bg: #ffffff;
  --theme-bg-secondary: #f6f4ef;
  --theme-text: #111111;
  --theme-text-muted: #9a9691;
  --theme-border: #111111;
  --theme-primary: #3bdd9b;
  --theme-primary-text: #111111;
  --theme-secondary: #cbb7f9;
  --theme-secondary-text: #111111;
  --theme-accent: #ff8a4f;
  --theme-accent-text: #111111;
  --theme-highlight: #ffd74b;
  --theme-highlight-text: #111111;
}
```

Observação: `orange` e `yellow` são tokens exatos do PDF. Tailwind v4 só define `orange-50...950`/`yellow-50...950` por padrão; `--color-orange` e `--color-yellow` não colidem.
