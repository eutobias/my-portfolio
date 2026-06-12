import { Box } from '@/components/base/Box'
import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'

interface AvatarHeroProps {
  name: string
  logo: string
}

export function AvatarHero({ name, logo }: AvatarHeroProps) {
  return (
    <Box className="w-full xl:w-auto justify-center shrink-0">
      <Box
        className="border-4 p-8 w-full md:w-sm relative flex-col"
        style={{
          backgroundColor: 'var(--theme-bg-secondary)',
          borderColor: 'var(--theme-border)',
          boxShadow: '8px 8px 0px 0px var(--theme-primary)',
        }}
      >
        {/* Top Bar Decoration */}
        <Box
          className="absolute top-0 left-0 right-0 h-6 border-b-4 items-center px-2 gap-1.5"
          style={{
            backgroundColor: 'var(--theme-border)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span
            className="text-[10px] font-mono ml-auto"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            tobias_avatar.sh
          </span>
        </Box>

        {/* Avatar Container */}
        <Box className="mt-4 flex-col items-center text-center gap-4">
          <Box
            className="w-36 h-36 rounded-full border-4 items-center justify-center overflow-hidden"
            style={{
              backgroundColor: 'var(--theme-secondary)',
              borderColor: 'var(--theme-border)',
              boxShadow: '4px 4px 0px 0px var(--theme-border)',
            }}
          >
            <img src={logo} className="w-28 h-auto" alt="My Avatar" />
          </Box>

          <Box className="flex-col">
            <Heading as="h3" size="md" weight="extrabold">
              {name}
            </Heading>
            <Text size="mono-sm" weight="bold" className="mt-1" as="span">
              @eutobias
            </Text>
          </Box>

          <Box
            className="w-full border-4 p-3 flex-col text-left"
            as="div"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <Text size="mono-sm" color="accent" as="span" colorfull>
              $ npm install expertise
            </Text>
            <Text size="mono-sm" color="primary" as="span" colorfull>
              &gt; React, Node.js, TypeScript
            </Text>
            <Text size="mono-sm" color="secondary" as="span" colorfull>
              &gt; Go, Python, AWS, Docker
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}