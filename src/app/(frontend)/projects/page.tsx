import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'

export default async function ProjectsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.findGlobal({ slug: 'projects-page', depth: 1 }).catch(() => null)

  if (!page) return notFound()

  const { intro } = page

  return (
    <main>
      <section>
        <h1>{intro.title}</h1>
        <RichText data={intro.description} />
      </section>
    </main>
  )
}
