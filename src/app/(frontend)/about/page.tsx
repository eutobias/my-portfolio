import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const about = await payload.findGlobal({ slug: 'about', depth: 1 }).catch(() => null)
  if (!about) return notFound()

  const { title, intro, professionalSummary, skills, experience } = about

  return (
    <main>
      {/* Intro */}
      <section>
        <h1>{title}</h1>
        <RichText data={intro} />
      </section>

      {/* Professional Summary */}
      <section>
        <h2>{professionalSummary.title}</h2>
        <RichText data={professionalSummary.intro} />
      </section>

      {/* Skills */}
      <section>
        <h2>{skills.title}</h2>
        {skills.skills.map((group) => (
          <div key={group.id}>
            <h3>{group.title}</h3>
            <ul>
              {group.tags.map((t) => (
                <li key={t.id}>{t.tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section>
        <h2>{experience.title}</h2>
        <ul>
          {experience.experiences.map((exp) => (
            <li key={exp.id}>
              <h3>{exp.name}</h3>
              <p>{exp.company}</p>
              <p>
                {exp.startAt}
                {exp.endAt ? ` – ${exp.endAt}` : ' – Present'}
              </p>
              <RichText data={exp.description} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
