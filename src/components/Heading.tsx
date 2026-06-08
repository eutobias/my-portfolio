import type { CSSProperties } from 'react'

type Size = 'xl' | 'lg' | 'md' | 'sm'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'
type Color = 'default' | 'muted' | 'primary' | 'secondary' | 'tertiary'
type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  children: React.ReactNode
  size?: Size
  weight?: Weight
  color?: Color
  as?: Tag
  className?: string
  style?: CSSProperties
}

const sizeVar: Record<Size, string> = {
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
  tertiary: 'var(--theme-accent-text)',
}

const tagDefaultSize: Record<Tag, Size> = {
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
