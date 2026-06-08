import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import type { Media } from '@/payload-types'

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
      {/* Intro */}
      <section>
        <h1>{intro.title}</h1>
        <RichText data={intro.description} />
      </section>

      {/* Projects list */}
      <section>
        <ul>
          {projects.map((project) => {
            const firstMedia = project.medias?.[0]?.media as Media | undefined

            return (
              <li key={project.id}>
                {firstMedia?.url && (
                  <Image
                    src={firstMedia.url}
                    alt={project.title}
                    width={firstMedia.width ?? 400}
                    height={firstMedia.height ?? 300}
                  />
                )}

                <h2>{project.title}</h2>

                <RichText data={project.content} />

                {project.stacks?.length > 0 && (
                  <div>
                    {project.stacks.map((stack) => (
                      <div key={stack.id}>
                        <h3>{stack.title}</h3>
                        <ul>
                          {stack.items.map((i) => (
                            <li key={i.id}>{i.item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
