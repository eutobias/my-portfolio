import type { ReactNode } from "react";
import { unstable_redirect as redirect } from "waku/router/server";

import { collections, schemaTitle } from "@/admin/schema";
import { getCurrentUser } from "@/auth/session.server";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = getCurrentUser();
  if (!user) {
    redirect("/login?next=%2Fadmin");
  }

  return (
    <AdminShell title={schemaTitle} collections={collections} user={user}>
      {children}
    </AdminShell>
  );
}

// Must render per request: reads the request cookie to resolve the user.
export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
