import { Box } from '@/components/base/Box'
import { Container } from '@/components/base/Container'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { AvatarHero } from '@/components/home/AvatarHero'
import { Badge } from '@/components/home/Badge'
import { CtaButtons } from '@/components/home/CtaButtons'

interface HeroCTA {
  label: string
  color: 'primary' | 'secondary' | 'tertiary'
}

interface HeroProps {
  badge: string
  greeting: string
  name: string
  logo: string
  description: string
  ctaProject: HeroCTA
  ctaContact: HeroCTA
}

export function Hero({ badge, greeting, name, logo, description, ctaProject, ctaContact }: HeroProps) {
  return (
    <Container className="w-full mt-16">
      <Box className="flex-col lg:flex-row w-full items-center justify-between gap-16">
        {/* Hero Text */}
        <Box as="section" className="w-full xl:w-auto flex-col gap-8">
          <Badge text={badge} />

          <Heading as="h1" size="xl" weight="extrabold" className="leading-tight tracking-tight">
            {greeting} <br />
            <span className="underline decoration-wavy" style={{ color: 'var(--theme-primary)' }}>
              {name}
            </span>
          </Heading>

          <Text
            size="body-lg"
            weight="medium"
            color="muted"
            className="border-l-8 pl-4 py-2"
            style={{ borderColor: 'var(--theme-secondary)' }}
          >
            {description}
          </Text>

          <CtaButtons ctaProject={ctaProject} ctaContact={ctaContact} />
        </Box>

        <AvatarHero name={name} logo={logo} />
      </Box>
    </Container>
  )
}
