import { Color, HeadingSize, Size, HeadingTag, Weight } from '@/components/base/types'
import type { CSSProperties } from 'react'

interface HeadingProps {
  children: React.ReactNode
  size?: HeadingSize
  weight?: Weight
  color?: Color
  as?: HeadingTag
  className?: string
  style?: CSSProperties
}

const sizeVar: Record<HeadingSize, string> = {
  xl: 'var(--text-heading-xl)',
  lg: 'var(--text-heading-lg)',
  md: 'var(--text-heading-md)',
  sm: 'var(--text-heading-sm)',
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

const tagDefaultSize: Record<HeadingTag, HeadingSize> = {
  h1: 'xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
  h5: 'sm',
  h6: 'sm',
}

export function Heading({
  children,
  size,
  weight = 'bold',
  color = 'default',
  as: Tag = 'h2',
  className,
  style,
}: HeadingProps) {
  const resolvedSize = size ?? tagDefaultSize[Tag]

  return (
    <Tag
      className={className}
      style={{
        fontSize: sizeVar[resolvedSize],
        fontWeight: weightVar[weight],
        color: colorVar[color],
        fontFamily: 'var(--font-display)',
        lineHeight: 'var(--line-height-tight)',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
