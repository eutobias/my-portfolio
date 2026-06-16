import { Laptop, Server, Code } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Card, CardProps } from '@/components/base/Card'

type ServiceArea = 'frontend' | 'backend' | 'devops'

/** Lexical rich text state — same shape the Payload CMS API returns for richtext fields. */
type RichTextData = Parameters<typeof RichText>[0]['data']

interface ServiceCardProps {
  area: ServiceArea
  icon?: string
  title: string
  intro: RichTextData
}

const AREA_ICONS: Record<ServiceArea, React.ReactNode> = {
  frontend: <Laptop className="w-6 h-6" />,
  backend: <Server className="w-6 h-6" />,
  devops: <Code className="w-6 h-6" />,
}

const AREA_ACCENT_VARS: Record<ServiceArea, { shadow: CardProps["shadowColor"]; bg: string; text: string }> = {
  frontend: {
    shadow: 'secondary',
    bg: 'var(--theme-secondary)',
    text: 'var(--theme-secondary-text)',
  },
  backend: {
    shadow: 'primary',
    bg: 'var(--theme-primary)',
    text: 'var(--theme-primary-text)',
  },
  devops: {
    shadow: 'accent',
    bg: 'var(--theme-accent)',
    text: 'var(--theme-accent-text)',
  },
}

export function ServiceCard({ area, title, intro }: ServiceCardProps) {
  const accents = AREA_ACCENT_VARS[area]

  return (
    <Card shadowColor={accents.shadow}>
      {/* Icon Box */}
      <Box
        className="w-12 h-12 items-center justify-center border-4"
        style={{
          backgroundColor: accents.bg,
          color: accents.text,
          borderColor: 'var(--theme-border)',
          boxShadow: '3px 3px 0px 0px var(--theme-border)',
        }}
      >
        {AREA_ICONS[area]}
      </Box>

      <Heading as="h3" size="sm" weight="extrabold">
        {title}
      </Heading>

      <div
        className="text-sm leading-relaxed font-mono font-medium"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        <RichText data={intro} />
      </div>
    </Card>
  )
}