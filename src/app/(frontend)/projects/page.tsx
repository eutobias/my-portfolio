import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { Grid } from '@/components/base/Grid'
import { SectionHeader } from '@/components/base/SectionHeader'
import { ProjectCard } from '@/components/base/ProjectCard'
import { Layers } from 'lucide-react'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'
import { ProjectList } from '@/components/projects/ProjectsList'

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
      <ProjectList intro={intro} projects={projects} />
    </main>
  )
}