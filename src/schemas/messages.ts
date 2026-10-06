import type { CollectionDef } from "@/admin/types";

export const messages: CollectionDef = {
  slug: "messages",
  label: "Mensagens",
  icon: "fileText",
  description: "Mensagens recebidas pelo formulário de contato.",
  locales: ["pt"],
  list: ["id", "name", "email", "createdAt"],
  fields: [
    { name: "name", label: "Nome", type: "text", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "phone", label: "Telefone", type: "text" },
    { name: "message", label: "Mensagem", type: "textarea", required: true },
  ],
};
