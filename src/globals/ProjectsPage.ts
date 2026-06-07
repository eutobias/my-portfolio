import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects Page',
  fields: [
    {
      name: 'intro',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
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
                  feature.key === 'link',
              ),
            ],
          }),
        },
      ],
    },
  ],
}
