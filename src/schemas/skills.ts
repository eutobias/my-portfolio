import type { CollectionDef } from "@/admin/types";

export const skills: CollectionDef = {
  slug: "skills",
  label: "Skills",
  icon: "star",
  description: "Competências agrupadas por tema.",
  locales: ["pt", "en"],
  list: ["id", "title", "order"],
  fields: [
    { name: "title", label: "Grupo", type: "text", required: true },
    {
      name: "content",
      label: "Itens",
      type: "textarea",
      help: "Tecnologias separadas por vírgula.",
    },
    { name: "icon", label: "Ícone", type: "text", help: "Nome de ícone Feather.", localized: false },
    { name: "order", label: "Ordem", type: "number", defaultValue: 0, min: 0 },
  ],
};
