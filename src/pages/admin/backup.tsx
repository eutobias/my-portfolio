import { unstable_redirect as redirect } from "waku/router/server";

import { listBackups } from "@/admin/backup.server";
import { getCurrentUser } from "@/auth/session.server";
import { BackupManager } from "@/components/admin/backup-manager";

export default async function BackupPage() {
  const current = getCurrentUser();
  if (!current) {
    redirect("/login?next=%2Fadmin%2Fbackup");
  }

  return <BackupManager initial={listBackups()} />;
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
