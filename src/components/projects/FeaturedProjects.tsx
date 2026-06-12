import { ArrowUpRight, FolderOpen } from 'lucide-react'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { Grid } from '@/components/base/Grid'
import { SectionHeader } from '@/components/base/SectionHeader'
import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Media, Project } from '@/payload-types'
import { ButtonLink } from '@/components/base/ButtonLink'

interface FeaturedProjectsData {
  title: string
  ctaSeeAll: {
    label: string
    color: 'primary' | 'secondary' | 'tertiary'
  }
  projects?: { project: string | Project; id?: string | null }[] | null
}

interface FeaturedProjectsProps {
  data: FeaturedProjectsData
}

const CTA_VARS: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'var(--theme-primary)', text: 'var(--theme-primary-text)' },
  secondary: { bg: 'var(--theme-secondary)', text: 'var(--theme-secondary-text)' },
  tertiary: { bg: 'var(--theme-accent)', text: 'var(--theme-accent-text)' },
}

export function FeaturedProjects({ data }: FeaturedProjectsProps) {
  const ctaColors = CTA_VARS[data.ctaSeeAll.color] ?? CTA_VARS.primary

  return (
    <Box as="section" className="w-full flex-col">
      <Container>
        <Box className="flex-col gap-8 relative">
          {/* Header + CTA row */}
          <Box className="items-center justify-between gap-4">
            <SectionHeader
              icon={<FolderOpen className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />}
              title={data.title}
            />
          </Box>

          {/* Project Cards */}
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects?.map(({ project, id }) => {
              const p = project as Project
              const firstMedia = p.medias?.[0]?.media as Media | undefined

              return (
                <ProjectCard
                  key={id ?? p.id}
                  title={p.title}
                  content={p.content}
                  stacks={p.stacks}
                  media={firstMedia}
                />
              )
            })}
          </Grid>

          <ButtonLink href="/projects" variant="highlight" className='md:absolute top-0 right-0'>
            {data.ctaSeeAll.label}
            <ArrowUpRight className="w-4 h-4" />
          </ButtonLink>
        </Box>
      </Container>
    </Box>
  )
}
