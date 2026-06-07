import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'networkId',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
        {
          name: 'greeting',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaProject',
          type: 'group',
          label: 'CTA Project',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              required: true,
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          ],
        },
        {
          name: 'ctaContact',
          type: 'group',
          label: 'CTA Contact',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              required: true,
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whatIDo',
      type: 'group',
      label: 'What I Do',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'frontend',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
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
        },
        {
          name: 'backend',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
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
        },
        {
          name: 'devops',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
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
        },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'group',
      label: 'Featured Projects',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaSeeAll',
          type: 'group',
          label: 'CTA See All',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              required: true,
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          ],
        },
        {
          name: 'projects',
          type: 'array',
          label: 'Featured Projects',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'project',
              type: 'relationship',
              relationTo: 'projects',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
