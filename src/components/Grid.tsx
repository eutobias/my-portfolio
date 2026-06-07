type GridProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
}

export const Grid = ({ children, className, style, as: Component = 'div' }: GridProps) => {
  return (
    <Component style={style} className={`grid ${className}`}>
      {children}
    </Component>
  )
}
