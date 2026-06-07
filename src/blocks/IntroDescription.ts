import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const IntroDescription: Block = {
  slug: 'intro-description',
  labels: {
    singular: 'Intro Description',
    plural: 'Intro Descriptions',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures.filter(
            (feature) =>
              feature.key === 'bold' ||
              feature.key === 'italic' ||
              feature.key === 'underline' ||
              feature.key === 'link',
          ),
        ],
      }),
    },
  ],
}
