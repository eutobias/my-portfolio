import { Box } from '@/components/base/Box'

type ContainerProps = { children: React.ReactNode; className?: string; as?: React.ElementType }

export function Container({ children, className, as = 'div' }: ContainerProps) {
  return (
    <Box as={as} className={`flex-col px-8 xl:px-0 max-w-6xl mx-auto w-full ${className || ''}`}>
      {children}
    </Box>
  )
}
