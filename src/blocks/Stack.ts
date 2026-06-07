import type { Block } from 'payload'

export const Stack: Block = {
  slug: 'stack',
  labels: {
    singular: 'Stack',
    plural: 'Stack',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'item',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
