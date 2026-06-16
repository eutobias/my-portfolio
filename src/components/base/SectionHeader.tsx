import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { HeadingSize, TextSize } from '@/components/base/types'

interface SectionHeaderProps {
  icon?: React.ReactNode
  title: string
  intro?: string
  className?: string
  headingSize?: HeadingSize
  introSize?: TextSize
}

export function SectionHeader({ icon, title, intro, className, headingSize: size = 'lg', introSize = 'body-md' }: SectionHeaderProps) {
  return (
    <Box
      className={`w-full flex-col items-start justify-between border-b-4 pb-4 ${className || ''}`}
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <Heading as="h2" size={size} weight="extrabold" className="flex items-center gap-3">
        {!!icon && icon}
        {title}
      </Heading>
    </Box>
  )
}
