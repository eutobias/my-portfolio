import type { PageProps } from "waku/router";

import { getStandalone, listItems } from "@/admin/db.server";
import { getCollection, itemLabel } from "@/admin/schema";
import type {
  CollectionDef,
  RelationOptionsMap,
} from "@/admin/types";
import { CollectionManager } from "@/components/admin/collection-manager";
import { StandaloneManager } from "@/components/admin/standalone-manager";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

function buildRelationOptions(definition: CollectionDef): RelationOptionsMap {
  const relationOptions: RelationOptionsMap = {};
  for (const field of definition.fields) {
    if (field.type !== "relation" || !field.relation) continue;
    const target = getCollection(field.relation.to);
    if (!target) {
      relationOptions[field.name] = [];
      continue;
    }
    relationOptions[field.name] = listItems(target, { limit: 100 }).items.map(
      (item) => ({ id: item.id, label: itemLabel(target, item) }),
    );
  }
  return relationOptions;
}

export default async function CollectionPage({
  collection,
}: PageProps<"/admin/[collection]">) {
  const definition = getCollection(collection);

  if (!definition) {
    return (
      <Box className="flex-col gap-2 p-4 sm:p-6 lg:p-8">
        <Text size="title" className="font-semibold text-gray-900">
          Coleção não encontrada
        </Text>
        <Text className="text-gray-500">
          Não há definição para <code>{collection}</code> em{" "}
          <code>src/schemas</code>.
        </Text>
      </Box>
    );
  }

  const relationOptions = buildRelationOptions(definition);

  if (definition.standalone) {
    return (
      <StandaloneManager
        key={definition.slug}
        collection={definition}
        initial={getStandalone(definition)}
        relationOptions={relationOptions}
      />
    );
  }

  const initial = listItems(definition, { page: 1, limit: 10 });

  return (
    <CollectionManager
      key={definition.slug}
      collection={definition}
      initial={initial}
      relationOptions={relationOptions}
    />
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
