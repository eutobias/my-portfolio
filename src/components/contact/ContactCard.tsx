import { Box } from '@/components/base/Box'
import { Card } from '@/components/base/Card'
import { Text } from '@/components/base/Text'

export function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <Card className="flex-row items-center gap-4">
      <span>{icon}</span>
      <Box className="flex-col gap-0">
        <Text size="mono-lg" color="muted" className="uppercase">
          {label}
        </Text>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold hover:opacity-70 transition-opacity"
          >
            {value}
          </a>
        )}
      </Box>
    </Card>
  )
}
