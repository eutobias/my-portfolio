import { Box } from '@/components/base/Box'
import { Container } from '@/components/base/Container'
import { Copyright } from '@/components/footer/Copyright'
import { Sitename } from '@/components/footer/Sitename'
import { SocialLinks } from '@/components/footer/SocialLinks'
import type { Footer as FooterType } from '@/payload-types'

interface FooterProps {
  data: FooterType
}

export function Footer({ data }: FooterProps) {
  return (
    <Box
      as="footer"
      className="w-full flex-col border-t-4 py-8 mt-16"
      style={{
        backgroundColor: 'var(--theme-bg)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <Container>
        <Box className="flex-col w-full lg:flex-row items-center justify-between gap-6">
          <Sitename name={data.info.name} description={data.info.description} />

          <Copyright text={data.info.copyright} />

          <SocialLinks links={data.socialNetworks} />
        </Box>
      </Container>
    </Box>
  )
}
