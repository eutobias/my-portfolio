import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import type { Media } from '@/payload-types'
import config from '@/payload.config'

export const revalidate = 60

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const project = docs[0]
  if (!project) return notFound()

  return (
    <main>
      <h1>{project.title}</h1>

      {/* Media gallery */}
      {project.medias?.length > 0 && (
        <ul>
          {project.medias.map(({ media, id }) => {
            const m = media as Media
            return (
              m?.url && (
                <li key={id}>
                  <Image
                    src={m.url}
                    alt={project.title}
                    width={m.width ?? 800}
                    height={m.height ?? 600}
                  />
                </li>
              )
            )
          })}
        </ul>
      )}

      {/* Content */}
      <section>
        <RichText data={project.content} />
      </section>

      {/* Stacks */}
      {project.stacks?.length > 0 && (
        <section>
          {project.stacks.map((stack) => (
            <div key={stack.id}>
              <h2>{stack.title}</h2>
              <ul>
                {stack.items.map((i) => (
                  <li key={i.id}>{i.item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
