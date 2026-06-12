'use client'

import { usePathname } from 'next/navigation'
import { Box } from '@/components/base/Box'
import { ButtonLink } from '@/components/base/ButtonLink'
import type { Header } from '@/payload-types'

interface NavigationProps {
  navigation: Header['navigation']
}

export function Navigation({ navigation }: NavigationProps) {
  const pathname = usePathname()

  return (
    <Box className="gap-3 items-center hidden md:flex">
      {Object.entries(navigation).map(([key, value]) => {
        const isActive = pathname === value.href
        const label = value.label || key.charAt(0).toUpperCase() + key.slice(1)
        return (
          <ButtonLink
            key={value.href}
            href={value.href}
            variant={isActive ? 'accent' : 'secondary'}
            size="md"
            className={`
                text-center 
                ${isActive ? 'shadow-[0px_0px_0px_0px_rgba(0,0,0,0)]! translate-x-0.5 translate-y-0.5 hover:translate-x-0.5! hover:translate-y-0.5!' : ''}
            `}
          >
            {label}
          </ButtonLink>
        )
      })}
    </Box>
  )
}
