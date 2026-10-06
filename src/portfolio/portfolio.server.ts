/**
 * Public read model for the portfolio. Resolves collections and the standalone
 * navigation record into serialisable shapes for the public pages.
 */
import { getStandalone, listItems } from "@/admin/db.server";
import { getCollection, isLocalizedField } from "@/admin/schema";
import type { Item, MediaItem } from "@/admin/types";
import { defaultLocale } from "@/schemas";

export type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: string;
  section: string;
  order: number;
};

export type Navigation = {
  siteName: string;
  ownerName: string;
  tagline: string;
  email: string;
  main: NavItem[];
  footer: NavItem[];
};

export type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  period: string;
  bullets: string[];
  icon: string;
  order: number;
};

export type SkillItem = {
  id: number;
  title: string;
  items: string[];
  icon: string;
  order: number;
};

export type ProjectItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  subtitle: string;
  description: string;
  frontend: string[];
  backend: string[];
  role: string;
  teamSize: string;
  client: string;
  year: string;
  highlights: string[];
  challenges: string[];
  results: string[];
  url: string;
  repo: string;
  medias: MediaItem[];
  cover: string;
  gallery: string[];
  order: number;
};

function collect(slug: string): Item[] {
  const collection = getCollection(slug);
  if (!collection) return [];
  return listItems(collection, { limit: 200 }).items;
}

function text(value: unknown): string {
  return value === null || value === undefined ? "" : String(value);
}

function splitLines(value: unknown): string[] {
  return text(value)
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/** Reads a native `list` value (string[]) or a legacy newline string. */
function asList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }
  return splitLines(value);
}

/** Read a (possibly localized) field for the given locale. */
function pick(
  slug: string,
  item: Item,
  field: string,
  locale: string,
): unknown {
  const value = item[field];
  const collection = getCollection(slug);
  if (collection) {
    const def = collection.fields.find((entry) => entry.name === field);
    if (
      def &&
      isLocalizedField(collection, def) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return (value as Record<string, unknown>)[locale] ?? null;
    }
  }
  return value;
}

function toNavItem(item: Item, locale: string): NavItem {
  return {
    id: item.id,
    label: text(pick("nav-links", item, "label", locale)),
    href: text(item.href),
    icon: text(item.icon),
    section: text(item.section),
    order: Number(item.order ?? 0),
  };
}

export function getNavigation(locale: string = defaultLocale): Navigation {
  const links = collect("nav-links")
    .map((item) => toNavItem(item, locale))
    .sort((a, b) => a.order - b.order || a.id - b.id);
  const byId = new Map(links.map((link) => [link.id, link]));

  const collection = getCollection("navigation");
  if (!collection) {
    return {
      siteName: "eutobias.dev",
      ownerName: "Tobias Taurian",
      tagline: "",
      email: "",
      main: [],
      footer: [],
    };
  }

  const nav = getStandalone(collection);
  const pickLinks = (value: unknown): NavItem[] =>
    (Array.isArray(value) ? value : [])
      .map((id) => byId.get(Number(id)))
      .filter((link): link is NavItem => Boolean(link));

  return {
    siteName: text(pick("navigation", nav, "siteName", locale)) || "eutobias.dev",
    ownerName: text(pick("navigation", nav, "ownerName", locale)) || "Tobias Taurian",
    tagline: text(pick("navigation", nav, "tagline", locale)),
    email: text(nav.email),
    main: pickLinks(nav.main),
    footer: pickLinks(nav.footer),
  };
}

export function getExperiences(
  locale: string = defaultLocale,
): ExperienceItem[] {
  return collect("experiences")
    .map((item) => ({
      id: item.id,
      title: text(pick("experiences", item, "title", locale)),
      company: text(pick("experiences", item, "company", locale)),
      period: text(item.period),
      bullets: asList(pick("experiences", item, "bullets", locale)),
      icon: text(item.icon),
      order: Number(item.order ?? 0),
    }))
    .sort((a, b) => a.order - b.order || a.id - b.id);
}

export function getSkills(locale: string = defaultLocale): SkillItem[] {
  return collect("skills")
    .map((item) => ({
      id: item.id,
      title: text(pick("skills", item, "title", locale)),
      items: asList(pick("skills", item, "content", locale)),
      icon: text(item.icon),
      order: Number(item.order ?? 0),
    }))
    .sort((a, b) => a.order - b.order || a.id - b.id);
}

export function getProjects(locale: string = defaultLocale): ProjectItem[] {
  return collect("projects")
    .map((item) => {
      const medias = Array.isArray(item.medias)
        ? (item.medias as MediaItem[])
        : [];
      const primary = medias.find((entry) => entry.primary) ?? medias[0] ?? null;
      return {
        id: item.id,
        name: text(pick("projects", item, "name", locale)),
        slug: text(pick("projects", item, "slug", locale)),
        category: text(pick("projects", item, "category", locale)),
        subtitle: text(pick("projects", item, "subtitle", locale)),
        description: text(pick("projects", item, "description", locale)),
        frontend: asList(pick("projects", item, "frontend", locale)),
        backend: asList(pick("projects", item, "backend", locale)),
        role: text(pick("projects", item, "role", locale)),
        teamSize: text(pick("projects", item, "teamSize", locale)),
        client: text(pick("projects", item, "client", locale)),
        year: text(item.year),
        highlights: asList(pick("projects", item, "highlights", locale)),
        challenges: asList(pick("projects", item, "challenges", locale)),
        results: asList(pick("projects", item, "results", locale)),
        url: text(item.url),
        repo: text(item.repo),
        medias,
        cover: primary?.url ?? "",
        gallery: medias
          .filter((entry) => entry !== primary)
          .map((entry) => entry.url),
        order: Number(item.order ?? 0),
      };
    })
    .sort((a, b) => a.order - b.order || a.id - b.id);
}

export function getProjectBySlug(
  locale: string,
  slug: string,
): ProjectItem | null {
  return getProjects(locale).find((project) => project.slug === slug) ?? null;
}
