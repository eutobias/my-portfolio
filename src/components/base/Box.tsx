type BoxProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
  onClick?: React.MouseEventHandler<HTMLElement>
}

export const Box = ({ children, className, style, as: Component = 'div', onClick }: BoxProps) => {
  return (
    <Component style={style} className={`flex ${className}`} onClick={onClick}>
      {children}
    </Component>
  )
}
