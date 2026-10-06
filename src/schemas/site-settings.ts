import type { CollectionDef } from "@/admin/types";

export const siteSettings: CollectionDef = {
  slug: "site-settings",
  label: "Configurações do site",
  icon: "settings",
  description: "Registro único com dados globais do site.",
  standalone: true,
  locales: ["pt", "en"],
  fields: [
    { name: "siteName", label: "Nome do site", type: "text", required: true },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      placeholder: "Usada em meta tags e no rodapé.",
    },
    { name: "contactEmail", label: "E-mail de contato", type: "email", localized: false },
    {
      name: "maintenance",
      label: "Modo manutenção",
      type: "boolean",
      defaultValue: false,
      help: "Exibe um aviso no site público.",
    },
  ],
};
