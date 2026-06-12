import { Award } from 'lucide-react'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'

interface SectionHeaderProps {
  icon?: React.ReactNode
  title: string
  intro?: string
  className?: string
}

export function SectionHeader({ icon, title, intro, className }: SectionHeaderProps) {
  return (
    <Box
      className={`w-full flex-col items-start justify-between border-b-4 pb-4 ${className || ''}`}
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <Heading as="h2" size="lg" weight="extrabold" className="flex items-center gap-3">
        {!!icon && icon}
        {title}
      </Heading>
      {intro && <Text color="muted">{intro}</Text>}
    </Box>
  )
}
