import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import '@/assets/styles.css'
import config from '@/payload.config'
import type { Media, Project } from '@/payload-types'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const home = await payload.findGlobal({ slug: 'home', depth: 1 }).catch(() => null)
  if (!home) return notFound()

  const { logo, hero, whatIDo, featuredProjects } = home
  const logoImage = logo.image as Media

  {
    console.log('featuredProjects?.projects: ', featuredProjects?.projects)
  }

  return (
    <main>
      {/* Logo */}
      <header>
        {logoImage?.url && (
          <Image
            alt={logo.name}
            src={logoImage.url}
            width={logoImage.width ?? 65}
            height={logoImage.height ?? 65}
          />
        )}
        <span>{logo.name}</span>
        <span>{logo.networkId}</span>
      </header>

      {/* Hero */}
      <section>
        <span>{hero.badge}</span>
        <p>{hero.greeting}</p>
        <h1>{hero.name}</h1>
        <p>{hero.description}</p>
        <a href="" data-color={hero.ctaProject.color}>
          {hero.ctaProject.label}
        </a>
        <a href="" data-color={hero.ctaContact.color}>
          {hero.ctaContact.label}
        </a>
      </section>

      {/* What I Do */}
      <section>
        <h2>{whatIDo.title}</h2>
        {(['frontend', 'backend', 'devops'] as const).map((area) => (
          <div key={area}>
            <span>{whatIDo[area].icon}</span>
            <h3>{whatIDo[area].title}</h3>
            <RichText data={whatIDo[area].intro} />
          </div>
        ))}
      </section>

      {/* Featured Projects */}
      <section>
        <h2>{featuredProjects.title}</h2>
        <a href="" data-color={featuredProjects.ctaSeeAll.color}>
          {featuredProjects.ctaSeeAll.label}
        </a>
      </section>
      <ul>
        {featuredProjects?.projects?.map(({ project }) => (
          <li key={project.id}>
            <div>
              {project.medias?.[0] && (
                <Image
                  alt={project.title}
                  src={project.medias[0].url}
                  width={project.medias[0].width ?? 65}
                  height={project.medias[0].height ?? 65}
                />
              )}
            </div>
            {project.title}
            {project.content && <RichText data={project.content} />}
          </li>
        ))}
      </ul>
    </main>
  )
}
