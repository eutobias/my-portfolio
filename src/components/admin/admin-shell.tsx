"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useRouter } from "waku";

import type { AuthUser } from "@/auth/config";
import type { CollectionDef } from "@/admin/types";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Sidebar } from "./sidebar";
import { ToastProvider } from "./toast";

export type AdminShellProps = {
  title: string;
  collections: CollectionDef[];
  user: AuthUser;
  children: ReactNode;
};

/**
 * Responsive admin chrome: static sidebar on desktop, off-canvas drawer on
 * mobile, plus the toast provider for the whole admin area.
 */
export const AdminShell = ({ title, collections, user, children }: AdminShellProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { path } = useRouter();

  // Close the mobile menu on every navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const handleLogout = async () => {
    try {
      await fetch("/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      window.location.assign("/login");
    }
  };

  return (
    <ToastProvider>
      <Box className="min-h-screen w-full flex-col bg-gray-50 lg:flex-row">
        {/* Mobile top bar */}
        <Box className="sticky top-0 z-30 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span aria-hidden className="text-base leading-none">
              ☰
            </span>
          </Button>
          <Text size="caption" className="font-semibold text-gray-900">
            {title}
          </Text>
          <span aria-hidden className="w-9" />
        </Box>

        {/* Mobile overlay */}
        {menuOpen ? (
          <Box
            onClick={() => setMenuOpen(false)}
            aria-hidden
            className="fixed inset-0 z-40 bg-gray-900/40 lg:hidden"
          />
        ) : null}

        {/* Sidebar: off-canvas on mobile, static on desktop */}
        <Box
          className={`fixed inset-y-0 left-0 z-50 flex transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            title={title}
            collections={collections}
            user={user}
            onLogout={() => void handleLogout()}
            onNavigate={() => setMenuOpen(false)}
          />
        </Box>

        <Box as="main" className="min-w-0 flex-1 flex-col">
          {children}
        </Box>
      </Box>
    </ToastProvider>
  );
};
