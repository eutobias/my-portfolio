"use client";

import { Link, useRouter } from "waku";

import type { CollectionDef } from "@/admin/types";
import type { AuthUser } from "@/auth/config";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { FiDatabase, FiUsers } from "react-icons/fi";
import { CollectionIcon } from "./collection-icon";

export type SidebarProps = {
  title: string;
  collections: CollectionDef[];
  user?: AuthUser;
  onLogout?: () => void;
  onNavigate?: () => void;
};

/**
 * Left navigation derived from the schema descriptor.
 */
export const Sidebar = ({
  title,
  collections,
  user,
  onLogout,
  onNavigate,
}: SidebarProps) => {
  const { path } = useRouter();

  return (
    <Box
      as="aside"
      className="sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white"
    >
      <Box className="flex-col gap-1 border-b border-gray-200 px-5 py-5">
        <Text size="caption" className="font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </Text>
        <Text size="caption" className="text-gray-400">
          Admin
        </Text>
      </Box>

      <Box className="flex-1 flex-col gap-1 p-3">
        <Text
          size="caption"
          className="px-2 pb-1 pt-2 font-semibold uppercase tracking-wide text-gray-400"
        >
          Coleções
        </Text>
        <Link
          to="/admin"
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
            path === "/admin"
              ? "bg-gray-900 font-medium text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span aria-hidden>▦</span>
          <span>Visão geral</span>
        </Link>
        {collections.map((collection) => {
          const href = `/admin/${collection.slug}`;
          const active = path === href || path.startsWith(`${href}/`);
          return (
            <Link
              key={collection.slug}
              to={href as `/admin/${string}`}
              onClick={onNavigate}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-gray-900 font-medium text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CollectionIcon
                name={collection.icon}
                className="h-4 w-4 shrink-0"
              />
              <span>{collection.label}</span>
              {collection.standalone ? (
                <span
                  aria-hidden
                  title="Registro único"
                  className={`ml-auto h-1.5 w-1.5 rounded-full ${
                    active ? "bg-white/70" : "bg-gray-300"
                  }`}
                />
              ) : null}
            </Link>
          );
        })}

        <Text
          size="caption"
          className="px-2 pb-1 pt-4 font-semibold uppercase tracking-wide text-gray-400"
        >
          Administração
        </Text>
        <Link
          to="/admin/users"
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
            path === "/admin/users"
              ? "bg-gray-900 font-medium text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FiUsers aria-hidden className="h-4 w-4 shrink-0" />
          <span>Usuários</span>
        </Link>
        <Link
          to="/admin/backup"
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
            path === "/admin/backup"
              ? "bg-gray-900 font-medium text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FiDatabase aria-hidden className="h-4 w-4 shrink-0" />
          <span>Backup</span>
        </Link>
      </Box>

      {user ? (
        <Box className="flex-col gap-2 border-t border-gray-200 p-3">
          <Box className="flex-col px-2">
            <Text
              size="caption"
              className="truncate font-medium text-gray-700"
              title={user.email}
            >
              {user.email}
            </Text>
            <Text size="caption" className="text-gray-400">
              Sessão ativa
            </Text>
          </Box>
          {onLogout ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onLogout}
            >
              Sair
            </Button>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};
