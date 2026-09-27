"use client";

import { Link, useRouter } from "waku";

import type { CollectionDef } from "@/admin/types";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

export type SidebarProps = {
  title: string;
  collections: CollectionDef[];
  onNavigate?: () => void;
};

/**
 * Left navigation derived from the schema descriptor.
 */
export const Sidebar = ({ title, collections, onNavigate }: SidebarProps) => {
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
              <span aria-hidden className="w-4 text-center">
                {collection.icon ?? "•"}
              </span>
              <span>{collection.label}</span>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};
