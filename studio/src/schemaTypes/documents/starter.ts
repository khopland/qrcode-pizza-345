import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'starter',
  title: 'starter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'navn',
      type: 'string',
      validation: rule => rule.required()
    }),

    defineField({
      name: 'navnEn',
      title: 'navn Engelsk',
      type: 'string',
      validation: rule => rule.required()
    }),

    defineField({
      name: 'pris',
      title: 'pris',
      type: "number",
      validation: rule => rule.required()
    })
  ]
})
