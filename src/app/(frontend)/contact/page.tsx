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

        {/* Contact Info */}
        <section>
          <h2>{contactInfo.title}</h2>

          <p>
            <strong>{contactInfo.answerTime.title}</strong> {contactInfo.answerTime.text}
          </p>
        </section>

        {/* Contact Form */}
        <section>
          <form>
            <div>
              <label>{contactForm.name.label}</label>
              <input name="name" type="text" placeholder={contactForm.name.placeholder} />
            </div>
            <div>
              <label>{contactForm.email.label}</label>
              <input name="email" type="email" placeholder={contactForm.email.placeholder} />
            </div>
            <div>
              <label>{contactForm.phone.label}</label>
              <input name="phone" type="tel" placeholder={contactForm.phone.placeholder} />
            </div>
            <div>
              <label>{contactForm.message.label}</label>
              <textarea name="message" placeholder={contactForm.message.placeholder} />
            </div>
            <button type="submit">{modalConfirmation.label}</button>
          </form>

          {/* Modal data available for client-side use */}
          <script
            type="application/json"
            id="modal-confirmation"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(modalConfirmation),
            }}
          />
          <script
            type="application/json"
            id="modal-error"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(modalError),
            }}
          />
        </section>
      </Container>
    </main>
  )
}
