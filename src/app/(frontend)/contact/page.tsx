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

function IconWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Box
      className={`
        w-12 h-12 items-center justify-center border-4 
        shadow-[3px_3px_0px_0px_var(--theme-border)] ${className || ''}`}
    >
      {children}
    </Box>
  )
}

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
          <Box className="flex-col gap-8">
            <Heading size="md">{contactInfo.title}</Heading>
            <ContactCard
              icon={
                <IconWrapper className="bg-primary">
                  <Mail className="w-6 h-6" />
                </IconWrapper>
              }
              label="Email"
              value={contactInfo?.email?.value}
              href={contactInfo?.email?.href || ''}
            />

            <ContactCard
              icon={
                <IconWrapper className="bg-secondary">
                  <Phone className="w-6 h-6" />
                </IconWrapper>
              }
              label="Phone / Mobile"
              value={contactInfo?.phone?.value}
              href={contactInfo?.phone?.href || ''}
            />

            <ContactCard
              icon={
                <IconWrapper className="bg-accent">
                  <MessageSquare className="w-6 h-6" />
                </IconWrapper>
              }
              label="WhatsApp"
              value={contactInfo?.whatsapp?.value}
              href={contactInfo?.whatsapp?.href || ''}
            />

            <Card className="bg-highlight! text-highlight! gap-2!">
              <Text size="body-md" className="font-bold! flex gap-2">
                <CheckCheck className="w-6 h-6 text-primary" /> {contactInfo.answerTime.title}
              </Text>
              <Text size="mono-lg">{contactInfo.answerTime.text}</Text>
            </Card>
          </Box>
          <Box className="w-full lg:w-2/3 justify-center shrink-0">
            <Box
              className="border-4 p-8 w-full relative flex-col"
              style={{
                backgroundColor: 'var(--theme-bg-secondary)',
                borderColor: 'var(--theme-border)',
                boxShadow: '8px 8px 0px 0px var(--theme-primary)',
              }}
            >
              {/* Top Bar Decoration */}
              <Box
                className="absolute top-0 left-0 right-0 h-6 border-b-4 items-center px-2 gap-1.5"
                style={{
                  backgroundColor: 'var(--theme-border)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span
                  className="text-[10px] font-mono ml-auto"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  send_message.sh
                </span>
              </Box>

              {/* Avatar Container */}
              <Box className="mt-4 flex-col items-center text-center gap-4">
               
               <Text size="body-lg" weight="bold">
                  Get in Touch
                </Text>

              </Box>
            </Box>
          </Box>
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
