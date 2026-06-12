import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import type { Media } from '@/payload-types'
import { Tag } from '@/components/base/Tag'
import { ButtonLink } from '@/components/base/ButtonLink'
import { ArrowUpRight } from 'lucide-react'

/** Lexical rich text state — same shape the Payload CMS API returns for richtext fields. */
type RichTextData = Parameters<typeof RichText>[0]['data']

interface ProjectCardProps {
  slug: string
  title: string
  content: string
  stacks?: { title: string; items: { item: string }[] }[]
  media: Media | undefined
}

export function ProjectCard({ slug, title, content, stacks, media }: ProjectCardProps) {
  return (
    <Box
      className="flex-col gap-4 border-4 p-6"
      style={{
        backgroundColor: 'var(--theme-bg-secondary)',
        borderColor: 'var(--theme-border)',
        boxShadow: '6px 6px 0px 0px var(--theme-border)',
      }}
    >
      {/* Project Image */}
      {media?.url && (
        <Box
          className="w-full border-2 overflow-hidden"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <Image
            alt={media.alt}
            src={media.url}
            width={media.width ?? 600}
            height={media.height ?? 350}
            className="w-full h-48 object-cover"
          />
        </Box>
      )}

      {/* Title */}
      <Heading as="h3" size="sm" weight="extrabold">
        {title}
      </Heading>

      {/* Content */}
      <div
        className="text-sm leading-relaxed font-mono font-medium"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        {content}
      </div>

      {!!(stacks && stacks?.length > 0) && (
        <Box className="flex-row flex-wrap gap-2">
          {stacks.map((stack) => stack.items.map(({ item }) => <Tag key={item} item={item} />))}
        </Box>
      )}

      <ButtonLink href={`/projects/${slug}`} variant="secondary" className="mt-auto">
        See the project
        <ArrowUpRight className="w-4 h-4" />
      </ButtonLink>
    </Box>
  )
}
