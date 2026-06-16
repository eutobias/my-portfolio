import { Box } from '@/components/base/Box'
import { Container } from '@/components/base/Container'
import { Grid } from '@/components/base/Grid'
import { PageTitleHeader } from '@/components/base/PageTitleHeader'
import { ProjectCard } from '@/components/base/ProjectCard'
import { Media, Project, ProjectsPage } from '@/payload-types'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'
import { notFoundImageFallback } from '@/utils/notfoundImageFallback'
import { Layers } from 'lucide-react'

type ProjectListProps = {
  intro: ProjectsPage['intro']
  projects: Project[]
}

export function ProjectList({ intro, projects }: ProjectListProps) {
  return (
    <Container as="section" className="py-12 flex-col gap-8">
      <PageTitleHeader
        icon={<Layers className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />}
        title={intro.title}
        intro={extractTextFromLexical(intro.description)}
      />

      <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {projects.map((project) => {
          const firstMedia = project.medias?.[0]?.media as Media | undefined
          const image = {
            url: firstMedia?.sizes?.thumbnail?.url || notFoundImageFallback(),
            alt: firstMedia?.alt || "",
            width: firstMedia?.sizes?.thumbnail?.width || 400,
            height: firstMedia?.sizes?.thumbnail?.height || 300,
          }

          return (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              content={extractTextFromLexical(project.content)}
              stacks={project.stacks}
              media={image}
            />
          )
        })}
      </Grid>
    </Container>
  )
}
