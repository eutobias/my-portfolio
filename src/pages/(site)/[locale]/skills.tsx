import { unstable_redirect as redirect } from "waku/router/server";
import type { PageProps } from "waku/router";

/**
 * Legacy route: content now lives on `/[locale]/about`.
 */
export default async function SkillsRedirectPage({ locale }: PageProps<"/[locale]/skills">) {
  redirect(`/${locale}/about`, 308);
  return null;
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
