import '@/assets/styles.css'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { ThemeProvider } from '@/contexts/ThemeContext'
import config from '@/payload.config'
import { getPayload } from 'payload'
import React from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  description: `Tobias is a Senior Full-Stack Developer 
  focused on building highly scalable solutions, 
  robust architectures and interfaces with stunning visual impact.`,
  title: 'eutobias.dev - Tobias Taurian - Portfolio',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header' }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
  ])

  const nav = header?.navigation

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Tobias is a Senior Full-Stack Developer focused on building highly scalable solutions, robust architectures and interfaces with stunning visual impact."
        />
        <meta
          name="keywords"
          content="portfolio, developer, programmer, projects, technology, web development, software engineer"
        />
        <meta name="author" content="Tobias Taurian Viana" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eutobias.dev/" />
        <meta property="og:title" content="eutobias.dev - Tobias Taurian - Portfolio" />
        <meta
          property="og:description"
          content="Tobias is a Senior Full Stack Developer with expertise in React, Node.js, and TypeScript. Building scalable web applications with modern JavaScript frameworks and cloud technologies."
        />
        <meta property="og:image" content="https://eutobias.dev/images/og_image.png" />
        <meta property="og:logo" content="https://eutobias.dev/images/logo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://eutobias.dev/" />
        <meta property="twitter:title" content="eutobias.dev - Tobias Taurian - Portfolio" />
        <meta
          property="twitter:description"
          content="Tobias is a Senior Full Stack Developer with expertise in React, Node.js, and TypeScript. Building scalable web applications with modern JavaScript frameworks and cloud technologies."
        />
        <meta property="twitter:image" content="https://eutobias.dev/images/og_image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {header && <Header data={header} />}

          {children}

          {/* <ThemeSwitcher /> */}

          {footer && <Footer data={footer} />}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
