import { Link } from "waku";

import { schemaTitle } from "@/admin/schema";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

export default async function HomePage() {
  return (
    <Box className="flex-col items-start gap-4 p-8">
      <title>{schemaTitle}</title>
      <Text size="title/lg" className="font-bold tracking-tight">
        {schemaTitle}
      </Text>
      <Text className="max-w-prose text-gray-600">
        Mini CMS estilo Payload. O painel admin é gerado a partir de{" "}
        <code>src/schema.json</code> e persiste dados em SQLite.
      </Text>
      <Link
        to="/admin"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Abrir painel admin →
      </Link>
      <Link to="/blog" className="text-sm text-gray-500 underline hover:text-gray-900">
        Ver blog público →
      </Link>
    </Box>
  );
}

export const getConfig = async () => {
  return { render: "static" } as const;
};
