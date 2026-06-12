import { Award } from 'lucide-react'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'

interface SectionHeaderProps {
  icon?: React.ReactNode
  title: string
}

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <Box
      className="w-full flex-row items-center justify-between border-b-4 pb-4"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <Heading
        as="h2"
        size="lg"
        weight="extrabold"
        className="flex items-center gap-3"
      >
        {!!icon && icon}
        {title}
      </Heading>
    </Box>
  )
}