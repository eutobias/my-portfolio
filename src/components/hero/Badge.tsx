import { Box } from '@/components/base/Box'

interface BadgeProps {
  text: string
}

export function Badge({ text }: BadgeProps) {
  return (
    <Box className="inline-flex">
      <span
        className="font-extrabold text-sm px-4 py-1.5 border-4 shadow-[4px_4px_0px_0px] -rotate-2"
        style={{
          backgroundColor: 'var(--theme-accent)',
          color: 'var(--theme-accent-text)',
          borderColor: 'var(--theme-border)',
          boxShadow: '4px 4px 0px 0px var(--theme-border)',
        }}
      >
        {text}
      </span>
    </Box>
  )
}