import { Box } from '@/components/base/Box'

export function Tag({ item }: { item: string }) {
  return (
    <Box
      className="text-xs font-bold font-mono px-2 py-1 border-2"
      style={{
        backgroundColor: 'var(--theme-bg)',
        borderColor: 'var(--theme-border)',
        color: 'var(--theme-text-muted)',
      }}
    >
      {item}
    </Box>
  )
}
