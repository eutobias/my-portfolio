import { Link } from "waku";

import { getPublishedPosts } from "@/blog/posts.server";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

export default async function BlogIndexPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <Box className="flex-col gap-10 p-4 sm:p-6 lg:p-12">
      <Box className="flex-col gap-2">
        <Text size="title/xl" className="font-bold tracking-tight text-gray-900">
          Blog
        </Text>
        <Text className="max-w-prose text-gray-500">
          Posts lidos do mini CMS, com autor, perfil e categorias resolvidos.
        </Text>
      </Box>

      {posts.length === 0 ? (
        <Text className="text-gray-400">Nenhum post publicado ainda.</Text>
      ) : null}

      {featured ? (
        <Link
          to={`/blog/${featured.slug}`}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-900 sm:p-8"
        >
          <Box className="items-center gap-2">
            <Badge tone="amber">Destaque</Badge>
            {featured.categories.map((category) => (
              <Badge key={category.id} tone="blue">
                {category.name}
              </Badge>
            ))}
          </Box>
          <Text size="title/lg" className="font-semibold tracking-tight text-gray-900">
            {featured.title}
          </Text>
          <Text className="max-w-prose text-gray-600">{featured.excerpt}</Text>
          <Text size="caption" className="text-gray-400">
            {featured.author ? `por ${featured.author.name}` : "sem autor"} ·{" "}
            {formatDate(featured.publishedAt)} · {featured.views} views
          </Text>
        </Link>
      ) : null}

      <Box
        style={{ display: "grid" }}
        className="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {rest.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-900"
          >
            <Box className="flex-wrap items-center gap-1.5">
              {post.categories.map((category) => (
                <Badge key={category.id} tone="blue">
                  {category.name}
                </Badge>
              ))}
            </Box>
            <Text size="subtitle" className="font-semibold text-gray-900">
              {post.title}
            </Text>
            <Text size="caption" className="line-clamp-3 text-gray-600">
              {post.excerpt}
            </Text>
            <Text size="caption" className="mt-auto text-gray-400">
              {post.author ? post.author.name : "sem autor"} ·{" "}
              {formatDate(post.publishedAt)}
            </Text>
          </Link>
        ))}
      </Box>

      <Box className="border-t border-gray-200 pt-4">
        <Text size="caption" className="text-gray-400">
          <Link to="/admin" className="underline hover:text-gray-700">
            Ir para o painel admin
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
