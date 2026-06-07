'use client'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette, X } from 'lucide-react'

export default function ThemeSwitcher() {
  const { themeName, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Theme Selector Panel */}
      {isOpen && (
        <div
          className="bg-[--theme-bg] border-4 border-[--theme-border] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-4 rounded-none min-w-max"
          style={{
            backgroundColor: `var(--theme-bg)`,
            borderColor: `var(--theme-border)`,
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b-2 border-[--theme-border]">
            <h4
              className="font-extrabold text-sm md:text-base"
              style={{ color: `var(--theme-text)` }}
            >
              Escolha um Tema
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              style={{ color: `var(--theme-text)` }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setTheme(theme.name)
                  setIsOpen(false)
                }}
                className={`px-4 py-2.5 border-4 border-[--theme-border] font-bold text-sm transition-all text-center ${
                  themeName === theme.name
                    ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] translate-x-0.5 translate-y-0.5'
                    : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-px hover:translate-y-px'
                }`}
                style={{
                  backgroundColor:
                    themeName === theme.name ? `var(--theme-primary)` : `var(--theme-secondary)`,
                  color:
                    themeName === theme.name
                      ? `var(--theme-primary-text)`
                      : `var(--theme-secondary-text)`,
                  borderColor: `var(--theme-border)`,
                }}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full border-4 border-[--theme-border] flex items-center justify-center font-extrabold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-[-4px] active:translate-y-[-4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all"
        style={{
          backgroundColor: `var(--theme-accent)`,
          color: `var(--theme-accent-text)`,
          borderColor: `var(--theme-border)`,
        }}
        title="Alternar Tema"
      >
        <Palette className="w-6 h-6" />
      </button>
    </div>
  )
}
