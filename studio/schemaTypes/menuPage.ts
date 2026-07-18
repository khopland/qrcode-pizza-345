import {defineArrayMember, defineField, defineType} from 'sanity'

const optionalKeys = new Set(['daily', 'holiday'])

export const menuPage = defineType({
  name: 'menuPage',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'routeKey',
      title: 'QR code destination',
      description: 'Filled automatically and locked to protect printed QR code links.',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().custom((value) =>
        ['carta', 'bebidas', 'daily', 'holiday'].includes(value || '')
          ? true
          : 'The destination must be one of the four fixed menus.',
      ),
    }),
    defineField({
      name: 'title',
      title: 'Visible title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'enabled',
      title: 'Show this menu today',
      description: 'When disabled, its home-page link is hidden and direct visitors see a notice.',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => !optionalKeys.has(parent?.routeKey),
    }),
    defineField({
      name: 'unavailableMessage',
      title: 'Unavailable message (optional)',
      description: 'Leave empty to use the default Spanish and English message.',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => !optionalKeys.has(parent?.routeKey),
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'images',
      title: 'Menu images',
      description: 'Drag images to reorder them. The first image appears first.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'menuImage',
          title: 'Menu page',
          type: 'object',
          preview: {
            select: {title: 'altText', subtitle: 'caption', media: 'image'},
          },
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required().assetRequired().custom(async (value, context) => {
                const reference = value?.asset?._ref
                if (!reference) return true
                const dimensions = await context
                  .getClient({apiVersion: '2026-07-18'})
                  .fetch<{width?: number; height?: number} | null>(
                    `*[_id == $id][0].metadata.dimensions{width, height}`,
                    {id: reference},
                  )
                return dimensions && (dimensions.width || 0) >= 1200 && (dimensions.height || 0) >= 800
                  ? true
                  : 'Use an image of at least 1200 × 800 px so the menu remains readable.'
              }),
            }),
            defineField({
              name: 'altText',
              title: 'Alternative text',
              description: 'Briefly describe the content; do not start with “image of”.',
              type: 'string',
              validation: (rule) => rule.required().min(3).max(160),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              validation: (rule) => rule.max(160),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.custom((images, context) => {
        const document = context.document as {routeKey?: string; enabled?: boolean} | undefined
        const required = !optionalKeys.has(document?.routeKey || '') || document?.enabled === true
        return required && (!images || images.length === 0)
          ? 'Add at least one image before publishing an active menu.'
          : true
      }),
    }),
  ],
  preview: {
    select: {title: 'title', routeKey: 'routeKey', enabled: 'enabled', media: 'images.0.image'},
    prepare({title, routeKey, enabled, media}) {
      const alwaysEnabled = routeKey === 'carta' || routeKey === 'bebidas'
      return {
        title: title || 'Untitled menu',
        subtitle: alwaysEnabled || enabled ? 'Visible' : 'Hidden',
        media,
      }
    },
  },
})
