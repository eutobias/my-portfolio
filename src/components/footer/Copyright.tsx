import { Box } from '@/components/base/Box'
import { Text } from '@/components/base/Text'

export function Copyright({ text }: { text: string }) {
  return (
    <Box
      className="px-3 py-2 border-4 text-center"
      style={{
        backgroundColor: 'var(--theme-highlight)',
        color: 'var(--theme-highlight-text)',
        borderColor: 'var(--theme-border)',
        boxShadow: '4px 4px 0px 0px var(--theme-border)',
      }}
    >
      <Text as="span" size="body-sm" weight="bold">
        {text}
      </Text>
    </Box>
  )
}
