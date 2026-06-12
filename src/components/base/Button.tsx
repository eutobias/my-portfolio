import { Size, Variant } from '@/components/base/types'
import type { CSSProperties, ButtonHTMLAttributes } from 'react'

export interface ButtonBaseProps {
  variant?: Variant
  size?: Size
  className?: string
  style?: CSSProperties
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: 'var(--theme-primary)',
    color: 'var(--theme-primary-text)',
    borderColor: 'var(--theme-border)',
  },
  secondary: {
    backgroundColor: 'var(--theme-secondary)',
    color: 'var(--theme-secondary-text)',
    borderColor: 'var(--theme-border)',
  },
  accent: {
    backgroundColor: 'var(--theme-accent)',
    color: 'var(--theme-accent-text)',
    borderColor: 'var(--theme-border)',
  },
  highlight: {
    backgroundColor: 'var(--theme-highlight)',
    color: 'var(--theme-highlight-text)',
    borderColor: 'var(--theme-border)',
  },
}

const sizeStyles: Record<Size, CSSProperties> = {
  sm: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    fontSize: 'var(--text-body-sm)',
  },
  md: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: 'var(--text-body-md)',
  },
  lg: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    fontSize: 'var(--text-body-lg)',
  },
}

export function getButtonStyle(variant: Variant, size: Size, style?: CSSProperties): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-bold)',
    border: '4px solid',
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
    lineHeight: 'var(--line-height-normal)',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
  children: React.ReactNode
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`hover:translate-x-px hover:translate-y-px transition-all ${className}`}
      style={getButtonStyle(variant, size, style)}
      {...rest}
    >
      {children}
    </button>
  )
}
