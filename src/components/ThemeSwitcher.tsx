'use client'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette, X } from 'lucide-react'
import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'

export default function ThemeSwitcher() {
  const { themeName, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box className="fixed bottom-6 right-6 z-50 flex-col items-end gap-3">
      {/* Theme Selector Panel */}
      {isOpen && (
        <Box
          className="flex-col p-4 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderColor: 'var(--theme-border)',
            minWidth: 'max-content',
          }}
        >
          <Box
            className="items-center justify-between gap-4 mb-3 pb-3 border-b-2"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            <Heading as="h4" size="sm" weight="extrabold">
              Escolha um Tema
            </Heading>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--theme-text)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </Box>

          <Box className="flex-col gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setTheme(theme.name)
                  setIsOpen(false)
                }}
                className={`px-4 py-2.5 border-4 font-bold text-sm transition-all text-center ${
                  themeName === theme.name
                    ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] translate-x-0.5 translate-y-0.5'
                    : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px'
                }`}
                style={{
                  backgroundColor:
                    themeName === theme.name ? 'var(--theme-primary)' : 'var(--theme-secondary)',
                  color:
                    themeName === theme.name
                      ? 'var(--theme-primary-text)'
                      : 'var(--theme-secondary-text)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <Text as="span" size="body-sm" weight="bold" style={{ color: 'inherit' }}>
                  {theme.label}
                </Text>
              </button>
            ))}
          </Box>
        </Box>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-[-4px] active:translate-y-[-4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all"
        style={{
          backgroundColor: 'var(--theme-accent)',
          color: 'var(--theme-accent-text)',
          borderColor: 'var(--theme-border)',
        }}
        title="Alternar Tema"
      >
        <Palette className="w-6 h-6" />
      </button>
    </Box>
  )
}
