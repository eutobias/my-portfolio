import { Box } from "@/components/base/Box";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";

export function Sitename({ name, description }: { name: string; description: string }) {
  return (
    <Box className="flex-col gap-1 text-center md:text-left">
      <Heading as="h3" size="md" weight="extrabold">
        {name}
      </Heading>
      <Text as="p" size="mono-lg" color="muted">
        {description}
      </Text>
    </Box>
  )
}
