import { User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { ExperienceList } from '@/components/about/ExperienceList'
import { ProfessionalSummary } from '@/components/about/ProfessionalSummary'
import { SkillsSection } from '@/components/about/SkillsSection'
import { Container } from '@/components/base/Container'
import { PageTitleHeader } from '@/components/base/PageTitleHeader'
import config from '@/payload.config'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'

export const revalidate = 60

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const about = await payload.findGlobal({ slug: 'about', depth: 1 }).catch(() => null)
  if (!about) return notFound()

  const { title, intro, professionalSummary, numbersWindow, skills, experience } = about

  return (
    <main>
      <Container className="py-12 gap-16">
        <PageTitleHeader
          icon={<User className="w-10 h-10" style={{ color: 'var(--theme-secondary)' }} />}
          title={title}
          intro={extractTextFromLexical(intro)}
        />

        <ProfessionalSummary 
          title={professionalSummary.title} 
          intro={professionalSummary.intro}
          numbersTitle={numbersWindow.title}
          numbers={numbersWindow.numbersList || []}
         />

        {/* Skills */}
        <SkillsSection title={skills.title} skillGroups={skills.skills} />

        {/* Experience */}
        <ExperienceList experience={experience} />

      </Container>
    </main>
  )
}
