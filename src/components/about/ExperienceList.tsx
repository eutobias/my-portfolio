import { ExperienceCard } from '@/components/about/ExperienceCard'
import { Box } from '@/components/base/Box'
import { SectionHeader } from '@/components/base/SectionHeader'
import { About } from '@/payload-types'
import { Briefcase } from 'lucide-react'

type ExperienceListProps = {
  experience: About['experience']
}

export function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <Box className="flex-col gap-8">
      <SectionHeader
        icon={<Briefcase className="w-8 h-8" style={{ color: 'var(--theme-highlight)' }} />}
        title={experience.title}
      />
      {experience.experiences.map((exp) => (
        <ExperienceCard
          key={exp.id}
          name={exp.name}
          company={exp.company}
          startAt={exp.startAt}
          endAt={exp.endAt}
          description={exp.description}
        />
      ))}
    </Box>
  )
}
