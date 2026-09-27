/**
 * Public read model for posts with their relations resolved.
 *
 * Server-only (uses the SQLite layer). Keeps the public pages free of any
 * knowledge about relation ids.
 */
import { listItems } from "@/admin/db.server";
import { getCollection } from "@/admin/schema";
import type { Item } from "@/admin/types";

export type PublicAuthor = {
  id: number;
  name: string;
  bio: string;
  email: string;
  website: string;
  location: string;
};

export type PublicCategory = {
  id: number;
  name: string;
};

export type PublicPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: string;
  publishedAt: string;
  featured: boolean;
  views: number;
  author: PublicAuthor | null;
  categories: PublicCategory[];
};

function asText(value: unknown): string {
  return value === null || value === undefined ? "" : String(value);
}

function collect(slug: string): Item[] {
  const collection = getCollection(slug);
  if (!collection) return [];
  return listItems(collection, { limit: 200 }).items;
}

function build(): PublicPost[] {
  const posts = collect("posts");
  const authors = collect("authors");
  const profiles = collect("profiles");
  const categories = collect("categories");

  const authorsById = new Map(authors.map((item) => [item.id, item]));
  const profilesById = new Map(profiles.map((item) => [item.id, item]));
  const categoriesById = new Map(categories.map((item) => [item.id, item]));

  return posts.map((post) => {
    const authorItem = post.author
      ? authorsById.get(Number(post.author))
      : undefined;
    const profileItem =
      authorItem && authorItem.profile
        ? profilesById.get(Number(authorItem.profile))
        : undefined;

    const categoryIds = Array.isArray(post.categories) ? post.categories : [];
    const resolvedCategories: PublicCategory[] = categoryIds.flatMap((id) => {
      const category = categoriesById.get(Number(id));
      return category ? [{ id: category.id, name: asText(category.name) }] : [];
    });

    return {
      id: post.id,
      title: asText(post.title),
      slug: asText(post.slug),
      excerpt: asText(post.excerpt),
      body: asText(post.excerpt),
      status: asText(post.status),
      publishedAt: asText(post.publishedAt),
      featured: Boolean(post.featured),
      views: Number(post.views ?? 0),
      author: authorItem
        ? {
            id: authorItem.id,
            name: asText(authorItem.name),
            bio: asText(authorItem.bio),
            email: asText(authorItem.email),
            website: profileItem ? asText(profileItem.website) : "",
            location: profileItem ? asText(profileItem.location) : "",
          }
        : null,
      categories: resolvedCategories,
    };
  });
}

/** All published posts, newest first. */
export function getPublishedPosts(): PublicPost[] {
  return build()
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        (b.publishedAt || "").localeCompare(a.publishedAt || "") ||
        b.id - a.id,
    );
}

/** A single published post by slug. */
export function getPublishedPostBySlug(slug: string): PublicPost | null {
  return (
    getPublishedPosts().find((post) => post.slug === slug) ?? null
  );
}

/** Featured published posts, newest first. */
export function getFeaturedPosts(): PublicPost[] {
  return getPublishedPosts().filter((post) => post.featured);
}
