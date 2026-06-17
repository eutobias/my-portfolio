import { RichText } from '@payloadcms/richtext-lexical/react'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { About } from '@/payload-types'
import { Card } from '@/components/base/Card'

interface ExperienceCardProps {
  name: string
  company: string
  startAt: string
  endAt?: string | null
  description: About['experience']['experiences'][number]['description']
  accentVar?: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function formatDateRange(start: string, end?: string | null): string {
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : 'Present'
  return `${startFormatted} – ${endFormatted}`
}

function BadgeText({ text }: { text: string }) {
  return (
    <Text color="highlight" className="text-xs font-body font-bold!">
      {text}
    </Text>
  )
}

export function ExperienceCard({
  name,
  company,
  startAt,
  endAt,
  description,
}: ExperienceCardProps) {
  return (
    <Box className={`flex-row gap-4 group relative`}>
      <div
        className="w-7 h-7 border-4 rounded-full shrink-0
        bg-secondary group-hover:bg-accent mt-6 hidden lg:flex"
      />

      <Card className="w-full">
        <Box className="flex-col lg:flex-row items-start">
          <Box className="flex-col w-full lg:border-b-2 pb-4 gap-2">
            <Heading as="h3" size="sm" weight="extrabold">
              {name}
            </Heading>
            <Text size="mono-lg" weight="bold" color="primary" colorfull>
              {company}
            </Text>
          </Box>

          <Box className={`
            bg-highlight border-black p-2 gap-1 border-4 w-auto
            lg:absolute lg:top-8 lg:right-8
          `}>
            {startAt && <BadgeText text={startAt} />}
            <BadgeText text={'-'} />
            {endAt && <BadgeText text={endAt} />}
            {!endAt && <BadgeText text={'Present'} />}
          </Box>
        </Box>

        <Box
          as="ul"
          className="flex-col text-sm leading-relaxed font-mono font-medium [&>li]:list-disc [&>li]:ml-6"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {description.map((block, index) => (
            <Text as="li" key={index} className="mb-2">
              {block?.Item}
            </Text>
          ))}
        </Box>
      </Card>
    </Box>
  )
}
