import type { CollectionDef } from "@/admin/types";

export const navigation: CollectionDef = {
  slug: "navigation",
  label: "Navegação",
  icon: "layout",
  description: "Registro único com cabeçalho e rodapé do site.",
  standalone: true,
  locales: ["pt", "en"],
  fields: [
    {
      name: "siteName",
      label: "Nome do site",
      type: "text",
      required: true,
      defaultValue: "eutobias.dev",
    },
    {
      name: "ownerName",
      label: "Nome do proprietário",
      type: "text",
      defaultValue: "Tobias Taurian",
    },
    { name: "tagline", label: "Tagline", type: "text" },
    { name: "email", label: "E-mail de contato", type: "email", localized: false },
    {
      name: "main",
      label: "Menu principal",
      type: "relation",
      relation: { to: "nav-links", type: "many-to-many" },
      help: "Links exibidos no cabeçalho, na ordem escolhida.",
    },
    {
      name: "footer",
      label: "Rodapé",
      type: "relation",
      relation: { to: "nav-links", type: "many-to-many" },
      help: "Links sociais exibidos no rodapé.",
    },
  ],
};
