import Link from 'next/link'
import { Heading } from '@/components/base/Heading'

interface LogoProps {
  siteName: string
}

export function Logo({ siteName }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center"
      style={{
        backgroundColor: 'var(--theme-primary)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        border: '4px solid var(--theme-border)',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        textDecoration: 'none',
      }}
    >
      <Heading as="h1" size="md" weight="extrabold" style={{ color: 'var(--theme-primary-text)', margin: 0 }}>
        {siteName}
      </Heading>
    </Link>
  )
}
