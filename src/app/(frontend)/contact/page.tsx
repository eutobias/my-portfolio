import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import { Container } from '@/components/base/Container'
import { extractTextFromLexical } from '@/utils/extractTextFromLexical'
import { Bolt, CheckCheck, Mail, MessageSquare, Phone, Zap } from 'lucide-react'
import { PageTitleHeader } from '@/components/base/PageTitleHeader'
import { ContactCard } from '@/components/contact/ContactCard'
import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { Card } from '@/components/base/Card'
import Head from 'next/head'
import { ContactInfoList } from '@/components/contact/ContactInfoList'
import { ContactForm } from '@/components/contact/ContactForm'

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
