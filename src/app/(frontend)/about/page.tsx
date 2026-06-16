import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { User, FileText, Briefcase, Terminal } from 'lucide-react'

import config from '@/payload.config'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { SectionHeader } from '@/components/base/SectionHeader'
import { SkillsSection } from '@/components/about/SkillsSection'
import { ExperienceCard } from '@/components/about/ExperienceCard'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'
import { PageTitleHeader } from '@/components/base/PageTitleHeader'
import { Card } from '@/components/base/Card'
import { Heading } from '@/components/base/Heading'
import { ProfessionalSummary } from '@/components/about/ProfessionalSummary'
import { ExperienceList } from '@/components/about/ExperienceList'

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
