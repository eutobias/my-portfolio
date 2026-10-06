"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { Box } from "@/components/box";
import { Text } from "@/components/text";

import { BrutalButton } from "./brutal-button";

const inputClass =
  "w-full border-4 border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-[16px] font-medium text-[var(--ink)] outline-none transition-shadow placeholder:text-[var(--muted)] focus:ring-4 focus:ring-[var(--primary)]";

type Values = { name: string; email: string; phone: string; message: string };

type LabeledFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

const LabeledField = ({ id, label, required, children }: LabeledFieldProps) => (
  <Box className="flex-col gap-2">
    <Text as="label" htmlFor={id} size="small" className="font-bold">
      {label}
      {required ? <span className="text-[var(--accent)]"> *</span> : null}
    </Text>
    {children}
  </Box>
);

export const ContactForm = () => {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof Values) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setErrors({});
    setFormError(null);
    try {
      const response = await fetch("/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: { pt: values.name },
          email: { pt: values.email },
          phone: { pt: values.phone },
          message: { pt: values.message },
        }),
      });
      const json = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string>; message?: string }
        | null;
      if (!response.ok) {
        setErrors(json?.errors ?? {});
        setFormError(json?.message ?? "Não foi possível enviar a mensagem.");
        return;
      }
      setSent(true);
    } catch {
      setFormError("Erro de rede ao enviar a mensagem.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Box className="flex-col items-center gap-4 border-4 border-[var(--border)] bg-[var(--primary)] p-10 text-[var(--primary-ink)] shadow-[8px_8px_0_0_var(--border)]">
        <span
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--border)] bg-[var(--bg)] text-3xl"
        >
          ✓
        </span>
        <Text as="h3" size="subheading" className="text-center font-bold">
          Mensagem enviada!
        </Text>
        <Text as="p" size="small" className="text-center">
          Obrigado pelo contato. Respondo em menos de 24 horas.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="flex-col border-4 border-[var(--border)] bg-[var(--bg-2)] shadow-[8px_8px_0_0_var(--accent)]">
      <Box className="items-center justify-between border-b-4 border-[var(--border)] bg-[var(--ink)] px-4 py-2">
        <Box className="items-center gap-1.5">
          <span aria-hidden className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </Box>
        <Text as="span" size="monoXs" className="text-[var(--bg)]">
          send_message.sh
        </Text>
      </Box>

      <Box as="form" className="flex-col gap-5 p-5" onSubmit={submit}>
        {formError ? (
          <Box className="border-4 border-[var(--border)] bg-[var(--accent)] px-3 py-2 text-[var(--accent-ink)]">
            <Text as="span" size="small" className="font-bold">
              {formError}
            </Text>
          </Box>
        ) : null}

        <LabeledField id="contact-name" label="Nome Completo" required>
          <input
            id="contact-name"
            className={inputClass}
            placeholder="Ex: João Silva"
            value={values.name}
            disabled={sending}
            onChange={update("name")}
          />
          {errors.name_pt ? (
            <Text as="span" size="monoXs" className="text-[var(--accent)]">
              {errors.name_pt}
            </Text>
          ) : null}
        </LabeledField>

        <div className="grid gap-5 sm:grid-cols-2">
          <LabeledField id="contact-email" label="E-mail" required>
            <input
              id="contact-email"
              type="email"
              className={inputClass}
              placeholder="Ex: joao@email.com"
              value={values.email}
              disabled={sending}
              onChange={update("email")}
            />
            {errors.email_pt ? (
              <Text as="span" size="monoXs" className="text-[var(--accent)]">
                {errors.email_pt}
              </Text>
            ) : null}
          </LabeledField>

          <LabeledField id="contact-phone" label="Telefone / Celular">
            <input
              id="contact-phone"
              className={inputClass}
              placeholder="Ex: (21) 99999-9999"
              value={values.phone}
              disabled={sending}
              onChange={update("phone")}
            />
          </LabeledField>
        </div>

        <LabeledField id="contact-message" label="Sua Mensagem" required>
          <textarea
            id="contact-message"
            rows={6}
            className={inputClass}
            placeholder="Descreva seu projeto, dúvida ou proposta..."
            value={values.message}
            disabled={sending}
            onChange={update("message")}
          />
          {errors.message_pt ? (
            <Text as="span" size="monoXs" className="text-[var(--accent)]">
              {errors.message_pt}
            </Text>
          ) : null}
        </LabeledField>

        <BrutalButton
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={sending}
        >
          {sending ? "Enviando..." : "Enviar Mensagem →"}
        </BrutalButton>
      </Box>
    </Box>
  );
};
