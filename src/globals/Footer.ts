import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'info',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'copyright', type: 'text', required: true },
      ],
    },
    {
      name: 'socialNetworks',
      type: 'array',
      label: 'Social Networks',
      fields: [
        { name: 'site', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
}
