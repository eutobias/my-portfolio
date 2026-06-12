import { Box } from '@/components/base/Box'

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Box className={`px-8 xl:px-0 max-w-6xl mx-auto w-full ${className || ''}`}>{children}</Box>
  )
}
