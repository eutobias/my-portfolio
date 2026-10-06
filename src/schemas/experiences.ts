import type { CollectionDef } from "@/admin/types";

export const experiences: CollectionDef = {
  slug: "experiences",
  label: "Experiências",
  icon: "archive",
  description: "Histórico profissional.",
  locales: ["pt", "en"],
  list: ["id", "title", "company", "period", "order"],
  fields: [
    { name: "title", label: "Cargo", type: "text", required: true },
    { name: "company", label: "Empresa", type: "text", required: true },
    { name: "period", label: "Período", type: "text", placeholder: "01/2020 - 12/2021", localized: false },
    {
      name: "bullets",
      label: "Atividades",
      type: "textarea",
      help: "Uma atividade por linha.",
    },
    { name: "icon", label: "Ícone", type: "text", help: "Nome de ícone Feather.", localized: false },
    { name: "order", label: "Ordem", type: "number", defaultValue: 0, min: 0 },
  ],
};
