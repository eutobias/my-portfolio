import { Box } from '@/components/base/Box'
import { Button } from '@/components/base/Button'
import { ButtonLink } from '@/components/base/ButtonLink'
import { Header } from '@/payload-types'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

type MobileNavigationProps = {
  isOpen: boolean
  navigation: Header['navigation']
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MobileNavigation({ isOpen, setIsOpen, navigation }: MobileNavigationProps) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <Box
      className="flex-col"
      onClick={() => setIsOpen(false)}
    >
      <Box
        className="flex-col gap-3 items-stretch md:hidden py-4"
        style={{
          backgroundColor: 'var(--theme-bg)',
          borderColor: 'var(--theme-border)',
        }}
        onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
        }}
      >
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
                ${!isActive ? 'hover:translate-x-px hover:translate-y-px transition-all' : ''}
                ${isActive ? 'shadow-[0px_0px_0px_0px_rgba(0,0,0,0)]! md:translate-x-0.5 md:translate-y-0.5' : ''}
            `}
            >
              {label}
            </ButtonLink>
          )
        })}
      </Box>
    </Box>
  )
}

export function MobileNavigationButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Button
      variant="secondary"
      onClick={() => setIsOpen(!isOpen)}
      className="p-2.5 border-4 flex items-center justify-center md:hidden!"
      style={{
        backgroundColor: 'var(--theme-highlight)',
        color: 'var(--theme-highlight-text)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </Button>
  )
}
