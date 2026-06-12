import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { type ButtonBaseProps, getButtonStyle } from '@/components/base/Button'

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
    <Link
      className={`hover:translate-x-px hover:translate-y-px transition-transform ${className}`}
      style={getButtonStyle(variant, size, style)}
      {...rest}
    >
      {children}
    </Link>
  )
}
