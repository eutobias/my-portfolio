import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { Box } from '@/components/base/Box'
import { Container } from '@/components/base/Container'
import { PageTitleHeader } from '@/components/base/PageTitleHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoList } from '@/components/contact/ContactInfoList'
import config from '@/payload.config'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'
import { Mail } from 'lucide-react'

export const revalidate = 60

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const contact = await payload.findGlobal({ slug: 'contact', depth: 1 }).catch(() => null)
  if (!contact) return notFound()

  const { title, intro, contactInfo, contactForm, modalConfirmation, modalError } = contact

  return (
    <main>
      <Container className="py-12 gap-16">
        <PageTitleHeader
          icon={<Mail className="w-10 h-10" style={{ color: 'var(--theme-accent)' }} />}
          title={title}
          intro={extractTextFromLexical(intro)}
        />

        <Box as="section" className="flex-col gap-16 lg:flex-row">
          
          <ContactInfoList contactInfo={contactInfo} />

          <ContactForm info={contactForm} />
          
        </Box>

      </Container>
    </main>
  )
}
