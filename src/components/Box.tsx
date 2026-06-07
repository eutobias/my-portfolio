type BoxProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
}

export const Box = ({ children, className, style, as: Component = 'div' }: BoxProps) => {
  return (
    <Component style={style} className={`flex ${className}`}>
      {children}
    </Component>
  )
}
