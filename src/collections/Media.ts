import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
        position: 'center',
      },
      {
        name: 'desktop',
        width: 1600,
        height: undefined,
        fit: 'inside',
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
}
