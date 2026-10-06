import { unstable_redirect as redirect } from "waku/router/server";

import { getCurrentUser } from "@/auth/session.server";
import { listUsers } from "@/auth/users.server";
import { UsersManager } from "@/components/admin/users-manager";

export default async function UsersPage() {
  const current = getCurrentUser();
  if (!current) {
    redirect("/login?next=%2Fadmin%2Fusers");
  }

  return (
    <UsersManager initial={listUsers()} currentUserId={current.id} />
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
