import { Box } from '@/components/base/Box'
import type { Footer as FooterType } from '@/payload-types'
import { Github, Instagram, Linkedin } from 'lucide-react'

export function SocialLinks({ links }: { links: FooterType['socialNetworks'] }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
  }

  const variantMap: Record<string, 'primary' | 'secondary' | 'accent'> = {
    github: 'primary',
    linkedin: 'secondary',
    instagram: 'accent',
  }

  return (
    <Box className="gap-3 items-center">
      {links?.map((social) => {
        const iconKey = social.site.toLowerCase()
        const Icon = iconMap[iconKey]
        const variant = variantMap[iconKey] || 'primary'

        if (!Icon) return null

        return (
          <a
            key={social.link}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            title={social.site}
            className="p-2.5 border-4 flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            style={{
              backgroundColor: `var(--theme-${variant})`,
              color: `var(--theme-${variant}-text)`,
              borderColor: 'var(--theme-border)',
              boxShadow: '4px 4px 0px 0px var(--theme-border)',
            }}
          >
            <Icon className="w-5 h-5" />
          </a>
        )
      })}
    </Box>
  )
}
