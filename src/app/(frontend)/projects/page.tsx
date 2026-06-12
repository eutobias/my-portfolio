import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { Grid } from '@/components/base/Grid'
import { SectionHeader } from '@/components/base/SectionHeader'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Layers } from 'lucide-react'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'

export default async function ProjectsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [page, { docs: projects }] = await Promise.all([
    payload.findGlobal({ slug: 'projects-page', depth: 1 }).catch(() => null),
    payload.find({ collection: 'projects', depth: 1 }),
  ])

  if (!page) return notFound()

  const { intro } = page

  return (
    <main>
      <Box as="section" className="w-full flex-col py-16">
        <Container>
          <Box className="flex-col gap-8">
            <SectionHeader
              icon={<Layers className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />}
              title={intro.title}
              intro={extractTextFromLexical(intro.description)}
              className="gap-4 pb-8"
            />

            <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const firstMedia = project.medias?.[0]?.media as Media | undefined

                return (
                  <ProjectCard
                    key={project.id}
                    slug={project.slug}
                    title={project.title}
                    content={extractTextFromLexical(project.content)}
                    stacks={project.stacks}
                    media={firstMedia}
                  />
                )
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </main>
  )
}