import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const contactInfoFields = [
  {
    name: 'icon',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'value',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'href',
    type: 'text' as const,
    required: false,
  },
]

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  fields: [
    // Inline IntroDescription fields
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

    // Contact Info
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Info',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'group',
          fields: contactInfoFields,
        },
        {
          name: 'phone',
          type: 'group',
          fields: contactInfoFields,
        },
        {
          name: 'whatsapp',
          type: 'group',
          fields: contactInfoFields,
        },
        {
          name: 'answerTime',
          type: 'group',
          label: 'Answer Time',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Contact Form
    {
      name: 'contactForm',
      type: 'group',
      label: 'Contact Form',
      fields: (['name', 'email', 'phone', 'message'] as const).map((fieldName) => ({
        name: fieldName,
        type: 'group' as const,
        fields: [
          {
            name: 'label',
            type: 'text' as const,
            required: true,
          },
          {
            name: 'placeholder',
            type: 'text' as const,
            required: true,
          },
        ],
      })),
    },

    // Modal Confirmation
    {
      name: 'modalConfirmation',
      type: 'group',
      label: 'Modal Confirmation',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },

    // Modal Error
    {
      name: 'modalError',
      type: 'group',
      label: 'Modal Error',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
