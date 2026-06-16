import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

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
        features: [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
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
            features: [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },

    {
      name: 'numbersWindow',
      type: 'group',
      label: 'Professional Summary - Numbers Window',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'numbersList',
          label: 'Numbers List',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
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
              type: 'text',
              required: true,
            },
            {
              name: 'endAt',
              type: 'text',
              required: false,
            },
            {
              name: 'description',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'Item',
                  type: 'text',
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
