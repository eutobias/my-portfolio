import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'medias',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            const source = data?.title ?? ''
            return source
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_]+/g, '-')
              .replace(/^-+|-+$/g, '')
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: 'stacks',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
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
    },
  ],
}
