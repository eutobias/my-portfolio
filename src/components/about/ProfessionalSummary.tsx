import { Box } from '@/components/base/Box'
import { Card } from '@/components/base/Card'
import { Heading } from '@/components/base/Heading'
import { SectionHeader } from '@/components/base/SectionHeader'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Terminal } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

type ProfessionalSummaryProps = {
  title: string
  intro: any
  numbersTitle: string
  numbers: {
    label: string
    value: string
    id?: string | null
  }[]
}

export function ProfessionalSummary({
  title,
  intro,
  numbersTitle,
  numbers,
}: ProfessionalSummaryProps) {
  return (
    <Box className="w-full flex-col gap-4">
      <SectionHeader
        icon={<Terminal className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />}
        title={title}
        headingSize="md"
        className="border-0! pb-0!"
      />
      <Box className="w-full flex-col lg:flex-row gap-6 justify-start items-start">
        <Card
          className="text-base leading-relaxed font-mono font-medium"
          style={{ color: 'var(--theme-text)' }}
        >
          <RichText data={intro} />
        </Card>

        <Card
          className="w-full lg:w-1/3 shrink-0 items-start"
          style={{ backgroundColor: 'var(--theme-accent) !important' }}
        >
          <Heading as="h3" size="sm" weight="bold" className="mb-2 border-b-2 pb-2">
            {numbersTitle}
          </Heading>

          <Box
            as="dl"
            className={`w-full flex-col xl:flex-row flex-wrap gap-y-2 font-bold font-mono
                        [&_dt]:text-sm [&_dt]:font-mono [&_dt]:tracking-wider [&_dt]:opacity-60 
                        [&_dd]:flex [&_dd]:self-start [&_dd]:text-sm [&_dd]:bg-black [&_dd]:text-accent [&_dd]:px-2
                        xl:[&_dd]:ml-auto xl:[&_dd]:items-end`}
          >
            {numbers?.map((number) => (
              <Fragment key={number.id}>
                <dt>{number.label}</dt>
                <dd>{number.value}</dd>
              </Fragment>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
