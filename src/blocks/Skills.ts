import type { Block } from 'payload'

export const Skills: Block = {
  slug: 'skills',
  labels: {
    singular: 'Skills',
    plural: 'Skills',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
