import { Container } from "@/components/Container";
import "@/styles/globals.scss";
import { Footer } from "@/widgets/Footer";
import { Navigation } from "@/widgets/Navigation";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Container>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
