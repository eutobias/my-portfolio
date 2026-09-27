import { Link } from "waku";

import { listItems } from "@/admin/db.server";
import { collections, schemaTitle } from "@/admin/schema";
import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

export default async function AdminHomePage() {
  const stats = collections.map((collection) => ({
    collection,
    total: listItems(collection, { limit: 1 }).total,
  }));

  return (
    <Box className="flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <Box className="flex-col gap-1">
        <Text size="title/xl" className="font-bold tracking-tight text-gray-900">
          {schemaTitle}
        </Text>
        <Text className="text-gray-500">
          Painel gerado automaticamente a partir do descritor JSON.
        </Text>
      </Box>

      <Box
        style={{ display: "grid" }}
        className="grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map(({ collection, total }) => (
          <Link
            key={collection.slug}
            to={`/admin/${collection.slug}`}
            className="group flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-900"
          >
            <Box className="items-center justify-between gap-3">
              <Box className="items-center gap-2">
                <span aria-hidden className="text-lg">
                  {collection.icon ?? "•"}
                </span>
                <Text size="subtitle" className="font-semibold text-gray-900">
                  {collection.label}
                </Text>
              </Box>
              <Badge tone="gray">{total}</Badge>
            </Box>
            <Text size="caption" className="text-gray-500">
              {collection.description ??
                `${collection.fields.length} campo(s) definidos no schema.`}
            </Text>
            <Text
              size="caption"
              className="font-medium text-gray-400 group-hover:text-gray-900"
            >
              Gerenciar →
            </Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
