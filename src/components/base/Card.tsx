import { Box } from '@/components/base/Box'

const ShadowColor = {
  border: 'var(--theme-border)',
  primary: 'var(--theme-primary)',
  secondary: 'var(--theme-secondary)',
  accent: 'var(--theme-accent)',
  highlight: 'var(--theme-highlight)',
} as const

type ShadowColor = keyof typeof ShadowColor

export type CardProps = {
  children: React.ReactNode
  shadowColor?: ShadowColor
  className?: string
  style?: React.CSSProperties
}

export function Card({ children, shadowColor= 'border', className, style }: CardProps) {
  return (
    <Box
      className={`flex-col gap-4 border-4 p-6 ${className || ''}`}
      style={{
        backgroundColor: 'var(--theme-bg-secondary)',
        borderColor: 'var(--theme-border)',
        boxShadow: `6px 6px 0px 0px ${ShadowColor[shadowColor] || 'var(--theme-border)'}`,
        ...style
      }}
    >
      {children}
    </Box>
  )
}
