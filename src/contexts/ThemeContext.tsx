'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeName = 'light-mint' | 'pastel-dream' | 'bold-contrast' | 'sunset-vibes'

export interface ThemeConfig {
  name: ThemeName
  label: string
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  'light-mint': {
    name: 'light-mint',
    label: 'Light Mint',
  },
  'pastel-dream': {
    name: 'pastel-dream',
    label: 'Pastel Dream',
  },
  'bold-contrast': {
    name: 'bold-contrast',
    label: 'Bold Contrast',
  },
  'sunset-vibes': {
    name: 'sunset-vibes',
    label: 'Sunset Vibes',
  },
}

interface ThemeContextType {
  currentTheme: ThemeConfig
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
  themes: ThemeConfig[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
}

export function ThemeProvider({ children, defaultTheme = 'light-mint' }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme)

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('neo-brutalism-theme') as ThemeName | null
    if (saved && saved in THEMES) {
      setThemeName(saved)
    }
  }, [])

  // Save theme to localStorage and apply data-theme attribute
  const setTheme = (name: ThemeName) => {
    setThemeName(name)
    localStorage.setItem('neo-brutalism-theme', name)
    document.documentElement.setAttribute('data-theme', name)
  }

  // Apply data-theme attribute on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName)
  }, [themeName])

  const currentTheme = THEMES[themeName]
  const themes = Object.values(THEMES)

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
