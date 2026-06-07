import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  fields: [
    // Inline IntroDescription fields (no wrapping group)
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

    // Professional Summary
    {
      name: 'professionalSummary',
      type: 'group',
      label: 'Professional Summary',
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
    },

    // Skills
    {
      name: 'skills',
      type: 'group',
      label: 'Skills',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'skills',
          type: 'array',
          required: true,
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
        },
      ],
    },

    // Experience
    {
      name: 'experience',
      type: 'group',
      label: 'Experience',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'experiences',
          type: 'array',
          required: true,
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
              name: 'startAt',
              type: 'date',
              required: true,
            },
            {
              name: 'endAt',
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
        },
      ],
    },
  ],
}
