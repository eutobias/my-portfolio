import { SpeedInsights } from "@vercel/speed-insights/next";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <title>eutobias.dev - Tobias Taurian - Portfolio</title>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Tobias is a Senior Full Stack Developer with expertise in React, Node.js, and TypeScript. Building scalable web applications with modern JavaScript frameworks and cloud technologies."
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
        <meta
          property="og:title"
          content="eutobias.dev - Tobias Taurian - Portfolio"
        />
        <meta
          property="og:description"
          content="Tobias is a Senior Full Stack Developer with expertise in React, Node.js, and TypeScript. Building scalable web applications with modern JavaScript frameworks and cloud technologies."
        />
        <meta
          property="og:image"
          content="https://eutobias.dev/images/og_image.jpg"
        />
        <meta
          property="og:logo"
          content="https://eutobias.dev/images/logo.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://eutobias.dev/" />
        <meta
          property="twitter:title"
          content="eutobias.dev - Tobias Taurian - Portfolio"
        />
        <meta
          property="twitter:description"
          content="Tobias is a Senior Full Stack Developer with expertise in React, Node.js, and TypeScript. Building scalable web applications with modern JavaScript frameworks and cloud technologies."
        />
        <meta
          property="twitter:image"
          content="https://eutobias.dev/images/og_image.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
      <body className="antialiased">
        <Main />
        <NextScript />
        <SpeedInsights />
      </body>
    </Html>
  );
}
