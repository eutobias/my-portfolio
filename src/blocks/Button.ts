import type { Block } from 'payload'

export const Button: Block = {
  slug: 'button',
  labels: {
    singular: 'Button',
    plural: 'Buttons',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'kind',
      type: 'text',
      required: true,
    },
  ],
}
