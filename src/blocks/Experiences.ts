import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Experiences: Block = {
  slug: 'experiences',
  labels: {
    singular: 'Experience',
    plural: 'Experiences',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'start_at',
      type: 'date',
      required: true,
    },
    {
      name: 'end_at',
      type: 'date',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures.filter(
            (feature) =>
              feature.key === 'bold' ||
              feature.key === 'italic' ||
              feature.key === 'underline' ||
              feature.key === 'link' ||
              feature.key === 'bulletedList',
          ),
        ],
      }),
    },
  ],
}
