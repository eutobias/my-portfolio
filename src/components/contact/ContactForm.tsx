'use client'
import { Box } from '@/components/base/Box'
import { Button } from '@/components/base/Button'
import { FormField } from '@/components/base/FormField'
import { Text } from '@/components/base/Text'
import { useContactForm } from '@/hooks/useContactForm'
import { Contact } from '@/payload-types'
import { Send } from 'lucide-react'

type ContactFormProps = {
  info: Contact['contactForm']
}

export function ContactForm({ info }: ContactFormProps) {
  const { onChange, onSubmit, state } = useContactForm()

  // const [notification, setNotification] = useState<{
  //   type: 'success' | 'error'
  //   message: string
  //   visible: boolean
  // }>({
  //   type: 'success',
  //   message: '',
  //   visible: false,
  // })

  // const handleNotification = (success: boolean) => {
  //   if (!success) {
  //     setNotification({
  //       type: 'error',
  //       message: 'Failed to send message',
  //       visible: true,
  //     })
  //     return
  //   }

  //   setNotification({
  //     type: 'success',
  //     message: 'Message sent successfully',
  //     visible: true,
  //   })
  // }

  return (
    <Box
      as="form"
      className="w-full lg:w-2/3 items-start justify-center shrink-0 grow-0"
      onSubmit={(e) =>
        onSubmit(e, (status) => {
          console.log(status)
        })
      }
    >
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
        <Box className="mt-4 flex-col items-center text-center gap-8">
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
              id="name"
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
      </Box>
    </Box>
  )
}
