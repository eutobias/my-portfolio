import { RichText } from '@payloadcms/richtext-lexical/react'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { Grid } from '@/components/base/Grid'
import { SectionHeader } from '@/components/base/SectionHeader'
import { ServiceCard } from '@/components/whatido/ServiceCard'
import { Award } from 'lucide-react'

type ServiceArea = 'frontend' | 'backend' | 'devops'
type RichTextData = Parameters<typeof RichText>[0]['data']

interface ServiceData {
  icon: string
  title: string
  intro: RichTextData
}

interface WhatIDoData {
  title: string
  frontend: ServiceData
  backend: ServiceData
  devops: ServiceData
}

interface WhatIDoProps {
  data: WhatIDoData
}

const AREAS: { key: ServiceArea; label: string }[] = [
  { key: 'frontend', label: 'Front-End' },
  { key: 'backend', label: 'Back-End' },
  { key: 'devops', label: 'DevOps' },
]

export function WhatIDo({ data }: WhatIDoProps) {
  return (
    <Box as="section" className="w-full flex-col py-16">
      <Container>
        <Box className="flex-col gap-8">
          <SectionHeader
            icon={<Award className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />}
            title={data.title}
          />

          <Grid className="grid-cols-1 md:grid-cols-3 gap-6">
            {AREAS.map(({ key, label }) => (
              <ServiceCard key={key} area={key} title={data[key].title} intro={data[key].intro} />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
