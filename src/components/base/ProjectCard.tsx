import { Box } from '@/components/base/Box'
import { ButtonLink } from '@/components/base/ButtonLink'
import { Card } from '@/components/base/Card'
import { Heading } from '@/components/base/Heading'
import { Tag } from '@/components/base/Tag'
import { Text } from '@/components/base/Text'
import type { Media } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  slug: string
  title: string
  content: string
  stacks?: { title: string; items: { item: string }[] }[]
  media?: Media
}

export function ProjectCard({ slug, title, content, stacks, media }: ProjectCardProps) {
  return (
    <Card>
      {/* Project Image */}
      {media?.url && (
        <Box
          className="w-full border-2 overflow-hidden"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <Image
            alt={media.alt}
            src={media.url}
            width={media.width || 400}
            height={media.height || 300}
            className="w-full h-48 object-cover"
          />
        </Box>
      )}

      {/* Title */}
      <Heading as="h3" size="sm" weight="extrabold">
        {title}
      </Heading>

      {/* Content */}
      <Text color="muted" size="mono-lg">
        {content}

      </Text>

      {!!(stacks && stacks?.length > 0) && (
        <Box className="flex-row flex-wrap gap-2">
          {stacks.map((stack) => stack.items.map(({ item }) => <Tag key={item} item={item} />))}
        </Box>
      )}

      <ButtonLink href={`/projects/${slug}`} variant="secondary" className="mt-auto">
        See the project
        <ArrowUpRight className="w-4 h-4" />
      </ButtonLink>
    </Card>
  )
}
