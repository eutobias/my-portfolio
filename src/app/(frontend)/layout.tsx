import React from 'react'
import '@/assets/styles.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <main>{children}</main>
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}
