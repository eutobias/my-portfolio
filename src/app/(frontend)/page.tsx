import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import '@/assets/styles.css'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { Hero } from '@/components/hero/Hero'
import { WhatIDo } from '@/components/whatido/WhatIDo'
import { FeaturedProjects } from '@/components/projects/FeaturedProjects'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const home = await payload.findGlobal({ slug: 'home', depth: 2 }).catch(() => null)
  if (!home) return notFound()

  const { logo, hero, whatIDo, featuredProjects } = home
  const logoImage = logo.image as Media

  return (
    <main>
      <Hero
        logo={logoImage?.url ?? ''}
        badge={hero.badge}
        greeting={hero.greeting}
        name={hero.name}
        description={hero.description}
        ctaProject={hero.ctaProject}
        ctaContact={hero.ctaContact}
      />

      <WhatIDo data={whatIDo} />

      <FeaturedProjects data={featuredProjects} />
    </main>
  )
}
