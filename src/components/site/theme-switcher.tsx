"use client";

import { useEffect, useState } from "react";

import { Box } from "@/components/box";
import { Text } from "@/components/text";

const THEMES = [
  { id: "mint", label: "Light Mint", color: "#00d084" },
  { id: "pastel", label: "Pastel Dream", color: "#ffb3d9" },
  { id: "bold", label: "Bold Contrast", color: "#ff006e" },
  { id: "sunset", label: "Sunset Vibes", color: "#ff6b35" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

/**
 * Fixed theme selector (docs/design.md). Persists to localStorage and applies
 * `data-theme` to the document root.
 */
export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<ThemeId>("mint");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("tt-theme") as ThemeId | null;
    if (stored) setTheme(stored);
  }, []);

  const apply = (id: ThemeId) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      window.localStorage.setItem("tt-theme", id);
    } catch {
      // ignore
    }
  };

  return (
    <Box className="fixed bottom-6 right-6 z-50 flex-col items-end gap-2">
      {open ? (
        <Box className="flex-col gap-1 border-4 border-[var(--border)] bg-[var(--bg)] p-2 shadow-[6px_6px_0_0_var(--border)]">
          {THEMES.map((entry) => (
            <Box
              as="button"
              key={entry.id}
              type="button"
              onClick={() => apply(entry.id)}
              className={`items-center gap-2 border-2 px-2 py-1.5 text-left transition-colors ${
                theme === entry.id
                  ? "border-[var(--border)] bg-[var(--bg-2)]"
                  : "border-transparent hover:border-[var(--border)]"
              }`}
            >
              <span
                aria-hidden
                style={{ backgroundColor: entry.color }}
                className="h-4 w-4 border-2 border-[var(--border)]"
              />
              <Text as="span" size="monoXs" className="uppercase tracking-[0.12em]">
                {entry.label}
              </Text>
            </Box>
          ))}
        </Box>
      ) : null}

      <Box
        as="button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="items-center gap-2 border-4 border-[var(--border)] bg-[var(--highlight)] px-3 py-2 text-[var(--highlight-ink)] shadow-[4px_4px_0_0_var(--border)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
      >
        <span aria-hidden className="text-sm">
          ◧
        </span>
        <Text as="span" size="monoXs" className="font-bold uppercase tracking-[0.14em]">
          Tema
        </Text>
      </Box>
    </Box>
  );
};
