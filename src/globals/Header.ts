import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'navigation',
      type: 'group',
      label: 'Navigation',
      fields: (['home', 'projects', 'about', 'contact'] as const).map((name) => ({
        name,
        type: 'group' as const,
        fields: [
          { name: 'label', type: 'text' as const, required: true },
          { name: 'href', type: 'text' as const, required: true },
        ],
      })),
    },
  ],
}
