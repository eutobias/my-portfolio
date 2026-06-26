import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { ProjectList } from '@/components/projects/ProjectsList'
import config from '@/payload.config'

export const revalidate = 60

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