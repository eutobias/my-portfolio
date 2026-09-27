import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

export type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPage: (page: number) => void;
};

/**
 * Simple previous/next pagination with a result summary.
 */
export const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  onPage,
}: PaginationProps) => {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <Box className="items-center justify-between gap-4 pt-4">
      <Text size="caption" className="text-gray-500">
        {from}–{to} de {total} {total === 1 ? "item" : "itens"}
      </Text>
      <Box className="items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Anterior
        </Button>
        <Text size="caption" className="px-1 text-gray-600">
          {page} / {totalPages}
        </Text>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Próxima
        </Button>
      </Box>
    </Box>
  );
};
