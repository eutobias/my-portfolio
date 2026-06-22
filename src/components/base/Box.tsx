import React from 'react'

type BoxProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
  onClick?: React.MouseEventHandler<HTMLElement>
  method?: React.FormHTMLAttributes<HTMLFormElement>['method']
  onSubmit?: React.FormHTMLAttributes<HTMLFormElement>['onSubmit']
}

export const Box = ({
  children,
  className,
  style,
  as: Component = 'div',
  onClick,
  ...rest
}: BoxProps) => {
  return (
    <Component style={style} className={`flex ${className}`} onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}
