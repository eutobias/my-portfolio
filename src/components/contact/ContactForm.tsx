'use client'
import { Box } from '@/components/base/Box'
import { Button } from '@/components/base/Button'
import { FormField } from '@/components/base/FormField'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { useContactForm } from '@/hooks/useContactForm'
import { Contact } from '@/payload-types'
import { CheckCircle2, Send, X } from 'lucide-react'
import { useState } from 'react'

type ContactFormProps = {
  info: Contact['contactForm']
}

export function ContactForm({ info }: ContactFormProps) {
  const { onChange, onSubmit, state } = useContactForm()
  const [view, setView] = useState<'form' | 'success' | 'error'>('form')

  const handleNotification = (success: boolean) => {
    setView(success ? 'success' : 'error')
  }

  return (
    <Box className="w-full lg:w-2/3 items-start justify-center shrink-0 grow-0">
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

        {view === 'form' && (
          <Box
            as="form"
            className="mt-4 flex-col items-center text-center gap-8"
            onSubmit={(e) =>
              onSubmit(e, handleNotification)
            }
          >
            <FormField
              type="text"
              inputMode="text"
              id="name"
              value={state.values.name}
              error={state.errors.name}
              onChange={onChange}
              label="Full name"
              placeholder="John doe"
              required
            />
            <Box className="flex-col lg:flex-row w-full gap-8 lg:gap-4">
              <FormField
                type="text"
                inputMode="text"
                id="email"
                label="Email"
                value={state.values.email}
                error={state.errors.email}
                onChange={onChange}
                placeholder="mail.site.com"
                required
              />

              <FormField
                type="text"
                inputMode="text"
                id="phone"
                label="Phone"
                value={state.values.phone}
                error={state.errors.phone}
                onChange={onChange}
                placeholder="+55 11 1234-5678"
              />
            </Box>
            <FormField
              type="textarea"
              id="message"
              value={state.values.message}
              error={state.errors.message}
              onChange={onChange}
              label="Your message"
              placeholder="Describe your project, question or oportunity"
              rows={4}
              required
            />

            <Button type="submit" size="lg" className="gap-2">
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </Button>
          </Box>
        )}

        {view === 'success' && (
          <Box className="mt-4 py-12 flex flex-col items-center text-center gap-6">
            <Box className="w-20 h-20 border-4 flex items-center justify-center rounded-full shadow-[4px_4px_0px_0px] animate-bounce bg-primary">
              <CheckCircle2 className="w-12 h-12" />
            </Box>
            <Box className="flex-col w-full md:w-2/3 gap-4">
              <Heading size="lg" weight="extrabold" className="text-2xl font-extrabold">
                Thank you!
              </Heading>
              <Text color="muted">
                Your message was sent successfully. I'll get back to you as soon as possible!
              </Text>
            </Box>
            <button
              onClick={() => setView('form')}
              className="mt-4 font-extrabold text-sm px-6 py-2.5 border-4 shadow-[4px_4px_0px_0px] hover:translate-x-[2px] hover:translate-y-[2px] 
              hover:shadow-[2px_2px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all bg-secondary"
            >
              Send another message
            </button>
          </Box>
        )}

        {view === 'error' && (
          <Box className="mt-4 py-12 flex flex-col items-center text-center gap-6">
            <Box className="w-20 h-20 border-4 flex items-center justify-center rounded-full shadow-[4px_4px_0px_0px] animate-bounce bg-accent">
              <X className="w-12 h-12" />
            </Box>
            <Box className="flex-col w-full md:w-2/3 gap-4">
              <Heading size="lg" weight="extrabold" className="text-2xl font-extrabold">
                Oops!
              </Heading>
              <Text color="muted">We couldn't send your message. Mind giving it another try?</Text>
            </Box>
            <button
              onClick={() => setView('form')}
              className="mt-4 font-extrabold text-sm px-6 py-2.5 border-4 shadow-[4px_4px_0px_0px] hover:translate-x-[2px] hover:translate-y-[2px] 
              hover:shadow-[2px_2px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all bg-highlight"
            >
              Try again
            </button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
