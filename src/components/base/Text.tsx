import { Color, TextSize, TextTag, Weight } from '@/components/base/types'
import type { CSSProperties } from 'react'



interface TextProps {
  children: React.ReactNode
  size?: TextSize
  weight?: Weight
  color?: Color
  as?: TextTag
  className?: string
  style?: CSSProperties
  colorfull?: boolean
}

const sizeVar: Record<TextSize, string> = {
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
  accent: 'var(--theme-accent-text)',
  highlight: 'var(--theme-highlight-text)',
}

const colorfullVar: Record<Color, string> = {
  default: 'var(--theme-text)',
  muted: 'var(--theme-text-muted)',
  primary: 'var(--theme-primary)',
  secondary: 'var(--theme-secondary)',
  accent: 'var(--theme-accent)',
  highlight: 'var(--theme-highlight)',
}

export function Text({
  children,
  size = 'body-md',
  weight = 'regular',
  color = 'default',
  as: Tag = 'p',
  className,
  style,
  colorfull = false
}: TextProps) {
  return (
    <Tag
      className={className}
      style={{
        fontSize: sizeVar[size],
        fontWeight: weightVar[weight],
        color: colorfull ? colorfullVar[color] : colorVar[color],
        fontFamily: size.startsWith('mono') ? 'var(--font-mono)' : 'var(--font-body)',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
