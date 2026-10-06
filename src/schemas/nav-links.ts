import type { CollectionDef } from "@/admin/types";

export const navLinks: CollectionDef = {
  slug: "nav-links",
  label: "Links de navegação",
  icon: "layout",
  description: "Itens do menu principal e do rodapé.",
  locales: ["pt", "en"],
  list: ["id", "label", "href", "section", "order"],
  fields: [
    { name: "label", label: "Rótulo", type: "text", required: true },
    {
      name: "href",
      label: "URL",
      type: "text",
      required: true,
      localized: false,
      placeholder: "/projects",
    },
    {
      name: "icon",
      label: "Ícone",
      type: "text",
      localized: false,
      help: "Nome de ícone Feather (ex.: folder, github).",
    },
    {
      name: "section",
      label: "Seção",
      type: "select",
      required: true,
      defaultValue: "main",
      options: [
        { label: "Principal", value: "main" },
        { label: "Rodapé", value: "footer" },
      ],
    },
    { name: "order", label: "Ordem", type: "number", defaultValue: 0, min: 0 },
  ],
};
