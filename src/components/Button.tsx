import type { CSSProperties, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary'
type Size = 'sm' | 'md' | 'lg'

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
  tertiary: {
    backgroundColor: 'var(--theme-accent)',
    color: 'var(--theme-accent-text)',
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
    border: '3px solid',
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
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
    <button className={className} style={getButtonStyle(variant, size, style)} {...rest}>
      {children}
    </button>
  )
}
