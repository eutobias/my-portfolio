import { Code } from 'lucide-react'
import { Container } from '@/components/base/Container'
import { Box } from '@/components/base/Box'
import { Grid } from '@/components/base/Grid'
import { SectionHeader } from '@/components/base/SectionHeader'
import { Heading } from '@/components/base/Heading'
import { Tag } from '@/components/base/Tag'

interface SkillGroup {
  title: string
  tags: { tag: string; id?: string | null }[]
  id?: string | null
}

interface SkillsSectionProps {
  title: string
  skillGroups: SkillGroup[]
}

export function SkillsSection({ title, skillGroups }: SkillsSectionProps) {
  return (
    <Box as="section" className="w-full flex-col">
      <Container>
        <Box className="flex-col gap-8">
          <SectionHeader
            icon={<Code className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />}
            title={title}
          />

          <Grid className="grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <Box
                key={group.id}
                className="flex-col gap-4 border-4 p-6"
                style={{
                  backgroundColor: 'var(--theme-bg-secondary)',
                  borderColor: 'var(--theme-border)',
                  boxShadow: '6px 6px 0px 0px var(--theme-border)',
                }}
              >
                <Heading as="h3" size="sm" weight="extrabold">
                  {group.title}
                </Heading>

                <Box className="flex-row flex-wrap gap-2">
                  {group.tags.map((t) => (
                    <Tag key={t.id} item={t.tag} />
                  ))}
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}