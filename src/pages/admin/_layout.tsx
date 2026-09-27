import type { ReactNode } from "react";

import { collections, schemaTitle } from "@/admin/schema";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminShell title={schemaTitle} collections={collections}>
      {children}
    </AdminShell>
  );
}
