import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { type ButtonBaseProps, getButtonStyle } from '@/components/Button'

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link>, ButtonBaseProps {
  children: React.ReactNode
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={className} style={getButtonStyle(variant, size, style)} {...rest}>
      {children}
    </Link>
  )
}
