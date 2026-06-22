import { Box } from '@/components/base/Box'
import { Card } from '@/components/base/Card'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { ContactCard } from '@/components/contact/ContactCard'
import { Contact } from '@/payload-types'
import { CheckCheck, Mail, MessageSquare, Phone } from 'lucide-react'

type ContactInfoListProps = {
  contactInfo: Contact['contactInfo']
}

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

export function ContactInfoList({ contactInfo }: ContactInfoListProps) {
  return (
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
  )
}
