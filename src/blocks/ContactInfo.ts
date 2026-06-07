import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contact-info',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info',
  },
  fields: [
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'info',
      type: 'text',
      required: true,
    },
  ],
}
