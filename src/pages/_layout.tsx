import type { ReactNode } from "react";

import "../styles.css";

type RootLayoutProps = { children: ReactNode };

const THEME_INIT = `(function(){try{var t=localStorage.getItem('tt-theme')||'mint';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <meta
        name="description"
        content="Portfólio de Tobias Taurian, desenvolvedor full-stack sênior."
      />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        precedence="font"
      />
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />

      <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--ink)] antialiased">
        {children}
      </div>
    </>
  );
}

export const getConfig = async () => {
  return { render: "static" } as const;
};
