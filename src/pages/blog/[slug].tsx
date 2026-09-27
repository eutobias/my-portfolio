import { Link } from "waku";
import type { PageProps } from "waku/router";

import { getPublishedPostBySlug } from "@/blog/posts.server";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

export default async function BlogPostPage({
  slug,
}: PageProps<"/blog/[slug]">) {
  const post = getPublishedPostBySlug(slug);

  if (!post) {
    return (
      <Box className="flex-col gap-4 p-4 sm:p-6 lg:p-12">
        <Text size="title" className="font-semibold text-gray-900">
          Post não encontrado
        </Text>
        <Link to="/blog" className="text-sm text-gray-500 underline hover:text-gray-900">
          ← Voltar para o blog
        </Link>
      </Box>
    );
  }

  return (
    <Box className="flex-col gap-8 p-4 sm:p-6 lg:p-12">
      <Link
        to="/blog"
        className="text-sm text-gray-500 underline hover:text-gray-900"
      >
        ← Todos os posts
      </Link>

      <Box className="flex-col gap-4">
        <Box className="flex-wrap items-center gap-1.5">
          {post.categories.map((category) => (
            <Badge key={category.id} tone="blue">
              {category.name}
            </Badge>
          ))}
        </Box>
        <Text size="title/xl" className="max-w-3xl font-bold tracking-tight text-gray-900">
          {post.title}
        </Text>
        <Text size="caption" className="text-gray-400">
          {post.author ? `por ${post.author.name}` : "sem autor"} ·{" "}
          {formatDate(post.publishedAt)} · {post.views} views
        </Text>
      </Box>

      <Box className="max-w-3xl flex-col gap-4">
        <Text className="text-lg leading-relaxed text-gray-700">
          {post.body}
        </Text>
      </Box>

      {post.author ? (
        <Box className="max-w-3xl flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5">
          <Text size="caption" className="font-semibold uppercase tracking-wide text-gray-400">
            Sobre o autor
          </Text>
          <Text size="subtitle" className="font-semibold text-gray-900">
            {post.author.name}
          </Text>
          {post.author.bio ? (
            <Text className="text-gray-600">{post.author.bio}</Text>
          ) : null}
          <Box className="flex-wrap items-center gap-4 pt-1">
            <Text size="caption" className="text-gray-500">
              {post.author.email}
            </Text>
            {post.author.location ? (
              <Text size="caption" className="text-gray-500">
                {post.author.location}
              </Text>
            ) : null}
            {post.author.website ? (
              <a
                href={post.author.website}
                className="text-sm text-gray-500 underline hover:text-gray-900"
                rel="noreferrer"
                target="_blank"
              >
                {post.author.website.replace(/^https?:\/\//, "")}
              </a>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
