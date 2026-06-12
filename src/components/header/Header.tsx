'use client'

import { Box } from '@/components/base/Box'
import { Button } from '@/components/base/Button'
import { MobileNavigation, MobileNavigationButton } from '@/components/header/MobileNavigation'
import { Logo } from '@/components/header/Logo'
import { Navigation } from '@/components/header/Navigation'
import type { Header as HeaderType } from '@/payload-types'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Container } from '@/components/base/Container'

interface HeaderProps {
  data: HeaderType
}

export function Header({ data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      as="header"
      className="flex-col py-4 gap-6 border-b-4"
      style={{
        backgroundColor: 'var(--theme-bg)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <Container>
        <Box className="w-full items-center justify-between gap-4">
          <Logo siteName={data.siteName} />
          <Navigation navigation={data.navigation} />
          <MobileNavigationButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
      </Container>
      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} navigation={data.navigation} />
    </Box>
  )
}
