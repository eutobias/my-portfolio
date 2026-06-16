import { ArrowRight } from 'lucide-react'
import { Box } from '@/components/base/Box'
import { ButtonLink } from '@/components/base/ButtonLink'

interface HeroCTA {
  label: string
  color: 'primary' | 'secondary' | 'tertiary'
}

interface CtaButtonsProps {
  ctaProject: HeroCTA
  ctaContact: HeroCTA
}

export function CtaButtons({ ctaProject, ctaContact }: CtaButtonsProps) {
  return (
    <Box className="flex-wrap gap-4">
      <ButtonLink
        href="/projects"
        variant={ctaProject.color === 'tertiary' ? 'accent' : ctaProject.color}
        size="lg"
        style={{
          boxShadow: '6px 6px 0px 0px var(--theme-border)',
          fontWeight: 'var(--font-extrabold)',
          gap: '0.5rem',
        }}
      >
        {ctaProject.label} <ArrowRight className="w-5 h-5" />
      </ButtonLink>

      <ButtonLink
        href="/contact"
        variant={ctaContact.color === 'tertiary' ? 'accent' : ctaContact.color}
        size="lg"
        style={{
          boxShadow: '6px 6px 0px 0px var(--theme-border)',
          fontWeight: 'var(--font-extrabold)',
          gap: '0.5rem',
        }}
      >
        {ctaContact.label} <ArrowRight className="w-5 h-5" />
      </ButtonLink>
    </Box>
  )
}