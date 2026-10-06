import type { CollectionDef } from "@/admin/types";

import { experiences } from "./experiences";
import { messages } from "./messages";
import { navLinks } from "./nav-links";
import { navigation } from "./navigation";
import { projects } from "./projects";
import { siteSettings } from "./site-settings";
import { skills } from "./skills";

export { defaultLocale, localeLabel, locales } from "./locales";
export type { LocaleDef } from "./locales";

/** Title shown across the admin panel. */
export const schemaTitle = "Mini Payload";

/**
 * Every collection available in the admin/API.
 *
 * To add a new collection: create a `<name>.ts` file in this folder exporting
 * a `CollectionDef` and register it in the array below.
 */
export const collections: CollectionDef[] = [
  navigation,
  navLinks,
  projects,
  experiences,
  skills,
  messages,
  siteSettings,
];
