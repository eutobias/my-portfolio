import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'

interface PageTitleHeaderProps {
  icon?: React.ReactNode
  title: string
  intro?: string
  className?: string
}

export function PageTitleHeader({ icon, title, intro, className }: PageTitleHeaderProps) {
  return (
    <Box
      className={`w-full flex-col items-start justify-between border-b-4 pb-4 gap-4 ${className || ''}`}
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <Heading as="h2" size="xl" weight="extrabold" className="flex items-center gap-3">
        {!!icon && icon}
        {title}
      </Heading>
      {intro && (
        <Text color="muted" size="body-md">
          {intro}
        </Text>
      )}
    </Box>
  )
}
