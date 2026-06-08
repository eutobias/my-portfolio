import type { CSSProperties } from 'react'

type Size = 'body-lg' | 'body-md' | 'body-sm' | 'mono-lg' | 'mono-md' | 'mono-sm'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'
type Color = 'default' | 'muted' | 'primary' | 'secondary' | 'tertiary'
type Tag = 'p' | 'span' | 'small' | 'strong' | 'em' | 'label' | 'code'

interface TextProps {
  children: React.ReactNode
  size?: Size
  weight?: Weight
  color?: Color
  as?: Tag
  className?: string
  style?: CSSProperties
}

const sizeVar: Record<Size, string> = {
  'body-lg': 'var(--text-body-lg)',
  'body-md': 'var(--text-body-md)',
  'body-sm': 'var(--text-body-sm)',
  'mono-lg': 'var(--text-mono-lg)',
  'mono-md': 'var(--text-mono-md)',
  'mono-sm': 'var(--text-mono-sm)',
}

const weightVar: Record<Weight, string> = {
  regular: 'var(--font-regular)',
  medium: 'var(--font-medium)',
  semibold: 'var(--font-semibold)',
  bold: 'var(--font-bold)',
  extrabold: 'var(--font-extrabold)',
}

const colorVar: Record<Color, string> = {
  default: 'var(--theme-text)',
  muted: 'var(--theme-text-muted)',
  primary: 'var(--theme-primary-text)',
  secondary: 'var(--theme-secondary-text)',
  tertiary: 'var(--theme-accent-text)',
}

export function Text({
  children,
  size = 'body-md',
  weight = 'regular',
  color = 'default',
  as: Tag = 'p',
  className,
  style,
}: TextProps) {
  return (
    <Tag
      className={className}
      style={{
        fontSize: sizeVar[size],
        fontWeight: weightVar[weight],
        color: colorVar[color],
        fontFamily: size.startsWith('mono') ? 'var(--font-mono)' : 'var(--font-body)',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
